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
    this.client.logger.info('Ready!')
  }
}
