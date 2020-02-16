import 'reflect-metadata'

import Client from './Client'

const bot = new Client()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
bot.on('message', async message => {
  console.log(await message.member?.getSettings() || 'No guild member.')
  console.log(await message.author?.getSettings() || 'No author.')
  console.log(await message.guild?.getSettings() || 'No guild.')
})

bot.login().catch(console.error)
