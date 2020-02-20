import { Client as DjsClient } from 'discord.js'
import { createConnection, Connection, getConnectionOptions } from 'typeorm'
import path from 'path'

export class Client extends DjsClient {
  public async login (token?: string): Promise<string> {
    await this.connectDatabase()
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
