import { Client as DjsClient, ClientOptions } from 'discord.js'
import path from 'path'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'

import { CommandRegistry, EventRegistry } from './registries'

export class Client extends DjsClient {
  public readonly commands: CommandRegistry

  public readonly events: EventRegistry

  public readonly path: string

  public constructor (options?: ClientOptions) {
    super(options)

    this.commands = new CommandRegistry(this)

    this.events = new EventRegistry(this)

    this.path = require.main?.filename
      ? path.dirname(require.main.filename)
      : process.cwd()
  }

  public async login (token?: string): Promise<string> {
    await Promise.all([
      this.connectDatabase(),
      this.commands.registerAll(),
      this.events.registerAll()
    ])
      .catch(console.error)

    return super.login(token)
  }

  private async connectDatabase (): Promise<Connection> {
    const target = await getConnectionOptions()
    const source = {
      entities: [
        path.join(__dirname, 'entities', '*.{js,ts}')
      ],
      migrations: [
        path.join(__dirname, 'migrations', '*.{js,ts}')
      ]
    }

    return createConnection(Object.assign(target, source))
  }
}
