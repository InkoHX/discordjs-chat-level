import { Client } from '.'

const bot = new Client({
  disabledEvents: [
    'TYPING_START',
    'WEBHOOKS_UPDATE'
  ]
})

bot.login()
  .catch((e) => bot.logger.error(e))
