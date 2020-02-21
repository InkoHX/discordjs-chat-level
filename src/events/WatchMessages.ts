import { Message } from 'discord.js'

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
    console.log(message.content)
    this.updateUserData(message).catch(console.error)
  }

  private async updateUserData (message: Message): Promise<void> {
    const settings = await message.author.getSettings()

    settings.exp += message.content.length
    if (this.isLevelUp(settings.exp, settings.maxExp)) {
      settings.exp = 0
      settings.maxExp *= 2
      settings.level += 1
    }

    await settings.save()
  }

  private isLevelUp (exp: number, maxExp: number): boolean {
    return exp >= maxExp
  }
}
