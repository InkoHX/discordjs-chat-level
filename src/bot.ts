import { Client } from '.'

const bot = new Client()

bot.login().catch(console.error)
