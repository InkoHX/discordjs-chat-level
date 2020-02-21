import { Message } from 'discord.js'

import { Client, Event } from '..'

export default class CommandHandler extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'message',
      name: 'CommandHandler'
    })
  }

  public run (message: Message): void {
    if (message.system || message.author.bot) return
    if (!message.content.startsWith(this.client.prefix)) return

    const args = message.content
      .replace(this.client.prefix, '')
      .split(' ')
    const command = this.client.commands.get(args[0])

    if (!command) return

    try {
      command.run(message, args[1])
    } catch (error) {
      this.client.logger.error(error)
    }
  }
}
