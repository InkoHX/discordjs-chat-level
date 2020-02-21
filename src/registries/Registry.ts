import { Collection } from 'discord.js'
import glob from 'glob'
import util from 'util'

import { Client } from '..'
import { Class } from '../common'

const globAsync = util.promisify(glob)

export type RegisterData<K, V> = Readonly<{
  key: K,
  value: V
}>

export class Registry<K, V> extends Collection<K, V> {
  public readonly client: Client

  public constructor (client: Client) {
    super()

    this.client = client
  }

  public register (data: RegisterData<K, V>): V {
    if (this.has(data.key)) throw new Error(`${data.key} is already in use.`)
    this.set(data.key, data.value)

    return data.value
  }

  public unregister (key: K): V {
    const value = this.get(key)
    if (!value || this.has(key)) throw new Error(`${key} does not exist.`)
    this.delete(key)

    return value
  }

  public registerAll (data: RegisterData<K, V>[]): Promise<V[]> {
    return Promise.all(data.map((value) => this.register(value)))
  }

  public unregisterAll (): Promise<V[]> {
    return Promise.all(this.keyArray().map((key) => this.unregister(key)))
  }

  protected scanFiles (pattern: string): Promise<string[]> {
    return globAsync(pattern, { cwd: this.client.path, absolute: true })
  }

  protected async loadModule (absolutePath: string): Promise<unknown> {
    try {
      const Module: unknown = await import(absolutePath)
        .then(value => value.default || value)

      delete require.cache[absolutePath]
      module.children.pop()

      if (!this.isClassSyntax(Module)) throw new Error('Please use the ES2015 class syntax.')

      return new Module(this.client)
    } catch (error) {
      this.client.logger.error(error)
      process.exit(1)
    }
  }

  private isClassSyntax (arg: unknown): arg is Class<unknown> {
    return typeof arg === 'function'
      && typeof arg.prototype === 'object'
      && arg.toString().startsWith('class')
  }
}
