import Structure from './Structure'
import { Client } from '..'
import { Message } from 'discord.js'

export default abstract class Command extends Structure {
  public readonly name: string

  public constructor (client: Client, name: string) {
    super(client)

    this.name = name.toLowerCase()
  }

  public abstract run (message: Message, ...args: string[]): unknown
}
