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
    if (message.author.bot || message.system) return
    if (!message.guild) return
    if (!message.content.length) return
    if (message.content.startsWith(this.client.prefix)) return

    this.updateUserSettings(message)
      .catch((e) => this.client.logger.error(e))
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
