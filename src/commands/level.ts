import { Message, MessageEmbed } from 'discord.js'

import { Client, Command } from '..'

export default class Level extends Command {
  public constructor (client: Client) {
    super(client, 'level', {
      requiredPermissions: ['EMBED_LINKS']
    })
  }

  public async run (message: Message): Promise<Message> {
    const settings = await message.author.getSettings()
    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setDescription('経験値はメッセージを送信すると増えます。')
      .setTitle(`${message.author.username} status`)
      .addField('レベル', settings.level)
      .addField('現在の経験値', settings.exp)
      .addField('次のレベルまでに必要なEXP', `${settings.exp}/${settings.maxExp} (残り ${settings.maxExp - settings.exp})`)

    return message.channel.send(embed)
  }
}
