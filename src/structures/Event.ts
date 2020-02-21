import { EventEmitter } from 'events'

import { Client } from '..'
import Structure from './Structure'

export type EventOptions = Readonly<{
  name: string,
  eventName: string,
  emitter?: EventEmitter,
  once?: boolean
}>

export abstract class Event extends Structure {
  public readonly name: string

  public readonly eventName: string

  public readonly emitter: EventEmitter

  public readonly once: boolean

  public readonly _bindRun: (...args: unknown[]) => void

  public constructor (client: Client, options: EventOptions) {
    super(client)

    this.name = options.name

    this.eventName = options.eventName

    this.emitter = options.emitter || this.client

    this.once = options.once || false

    this._bindRun = this.run.bind(this)
  }

  public abstract run (...args: unknown[]): void
}
