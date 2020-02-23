import { Command, Client, UserSettings } from '..'
import { Message, MessageEmbed } from 'discord.js'

export default class Ranking extends Command {
  public constructor (client: Client) {
    super(client, 'ranking')
  }

  public async run (message: Message): Promise<Message> {
    const ranking = await UserSettings.find({
      order: {
        level: 'DESC',
        exp: 'DESC'
      }
    })

    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setDescription('降順で上位5位まで表示されます。')
      .setTitle('Top 5 Level Ranking')
      .setTimestamp()

    ranking.slice(0, 5).forEach((value, index) => {
      const user = this.client.users.resolve(value.id)
      if (!user) return
      embed.addField(`${index + 1}. ${user.username}`, `Lv.${value.level}\nExp: (${value.exp}/${value.maxExp})`, true)
    })

    return message.channel.send(embed)
  } 
}
