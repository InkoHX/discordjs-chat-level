import { Message } from 'discord.js'

import { Client } from '..'
import Structure from './Structure'

export abstract class Command extends Structure {
  public readonly name: string

  public constructor (client: Client, name: string) {
    super(client)

    this.name = name.toLowerCase()
  }

  public abstract run (message: Message, ...args: string[]): Promise<Message | Message[]>
}
