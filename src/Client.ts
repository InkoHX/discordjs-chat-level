import { Client as DjsClient, ClientOptions } from 'discord.js'
import { Logger } from 'parrot-logger'
import path from 'path'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'

import { CommandRegistry, EventRegistry } from './registries'

export class Client extends DjsClient {
  public readonly commands: CommandRegistry

  public readonly events: EventRegistry

  public readonly logger: Logger

  public readonly path: string

  public readonly prefix: string

  public constructor (options?: ClientOptions) {
    super(options)

    this.commands = new CommandRegistry(this)

    this.events = new EventRegistry(this)

    this.logger = new Logger({
      file: {
        logging: true
      }
    })

    this.path = require.main?.filename
      ? path.dirname(require.main.filename)
      : process.cwd()

    this.prefix = 'ls!'
  }

  public async login (token?: string): Promise<string> {
    await Promise.all([
      this.connectDatabase(),
      this.commands.registerAll(),
      this.events.registerAll()
    ])
      .catch((e) => {
        this.logger.error(e)
        process.exit(1)
      })

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
