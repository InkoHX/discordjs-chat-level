import { Collection } from 'discord.js'
import Client from '../Client'
import util from 'util'
import path from 'path'
import glob, { IOptions } from 'glob'

const globAsync = util.promisify(glob)

export type Class<T> = new (...args: unknown[]) => T

export default abstract class Registry<K, V> extends Collection<K, V> {
  public readonly client: Client

  public constructor (client: Client) {
    super()

    this.client = client
  }

  public abstract register (relativePath: string): Promise<V>

  public unregister (key: K): V {
    const value = this.get(key)
    if (!value) throw new Error('There is no such key.')
    this.delete(key)

    return value
  }

  public async registerAll (pattern: string, options?: IOptions): Promise<V[]> {
    const files = await this.scanFiles(pattern, options)

    return Promise.all(files.map((file) => this.register(file)))
  }

  public unregisterAll (): Promise<V[]> {
    return Promise.all(this.keyArray().map((key) => this.unregister(key)))
  }

  protected scanFiles (pattern: string, options?: IOptions): Promise<string[]> {
    return globAsync(pattern, options)
  }

  protected async loadModule (relativePath: string): Promise<unknown> {
    try {
      const absolutePath = path.join(process.cwd(), relativePath)
      const Module: unknown = await import(absolutePath)
        .then(value => value.default || value)

      delete require.cache[absolutePath]
      module.children.pop()

      if (!this.isClassSyntax(Module)) throw new Error('Please use the ECMAScript 2015 class syntax.')

      return new Module(this.client)
    } catch (error) {
      this.client.emit('error', error)
      process.exit(1)
    }
  }

  private isClassSyntax (arg: unknown): arg is Class<unknown> {
    return typeof arg === 'function'
      && typeof arg.prototype === 'object'
      && arg.toString().startsWith('class')
  }
}
