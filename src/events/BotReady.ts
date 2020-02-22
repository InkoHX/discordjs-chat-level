import { Client, Event } from '..'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      name: 'BotReady',
      eventName: 'ready',
      once: true
    })
  }

  public run (): void {
    this.client.logger
      .info(`[Registry] Loaded ${this.client.commands.size} commands.`)
      .info(`[Registry] Loaded ${this.client.events.size} events.`)
      .info('All initial setup is completed.')
  }
}
