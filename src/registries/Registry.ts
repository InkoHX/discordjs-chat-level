import { Collection } from 'discord.js'
import Client from '../Client'
import util from 'util'
import glob, { IOptions } from 'glob'

const globAsync = util.promisify(glob)

export type Class<T> = new (...args: unknown[]) => T

export default abstract class Registry<K, V> extends Collection<K, V> {
  public readonly client: Client

  public constructor (client: Client) {
    super()

    this.client = client
  }

  public abstract register (): Promise<V>

  public abstract unregister (): Promise<V>

  public abstract registerAll (): Promise<V[]>

  public abstract unregisterAll(): Promise<V[]>

  protected scanDir (pattern: string, options?: IOptions): Promise<string[]> {
    return globAsync(pattern, options)
  }

  protected async loadModule (filePath: string): Promise<unknown> {
    const Module: unknown = await import(filePath)
      .then(value => value.default || value)
      .catch(e => this.client.emit('error', e))

    delete require.cache[filePath]
    module.children.pop()

    if (!this.isClassSyntax(Module)) throw new Error('Not class syntax.')

    return new Module(this.client)
  }

  private isClassSyntax (arg: unknown): arg is Class<unknown> {
    return typeof arg === 'function'
      && typeof arg.prototype === 'object'
      && arg.toString().startsWith('class')
  }
}
