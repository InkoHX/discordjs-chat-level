import { Structures } from 'discord.js'

import { UserSettings } from '../entities/UserSettings'

declare module 'discord.js' {
  interface User {
    getSettings(): Promise<UserSettings>
  }
}

export default Structures.extend('User', BaseClass => {
  return class extends BaseClass {
    public async getSettings (): Promise<UserSettings> {
      if (typeof this.id !== 'string') throw new Error('User id is unknown.')

      const settings = await UserSettings.findOne({ id: this.id })

      if (!settings) return new UserSettings(this)
      
      return settings
    }
  }
})
