import { Message, Util } from 'discord.js'

import { Client, Event } from '..'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      name: 'WatchMessages',
      eventName: 'message'
    })
  }

  public run (message: Message): void {
    if (message.author.bot && message.system) return
    if (!message.content.length) return

    this.updateUserSettings(message).catch(console.error)
  }

  private async updateUserSettings (message: Message): Promise<void> {
    const settings = await message.author.getSettings()

    settings.exp += Util.escapeMarkdown(message.content).length

    while (settings.exp >= settings.maxExp) {
      settings.level += 1
      settings.exp -= settings.maxExp
      settings.maxExp *= 2
    }

    await settings.save()
  }
}
