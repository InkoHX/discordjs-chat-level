import { Event, Client } from '..'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      name: 'BotReady',
      eventName: 'ready',
      once: true
    })
  }

  public run (): void {
    console.log('Ready')
  }
}
