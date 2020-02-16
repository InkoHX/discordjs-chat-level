import { Structures } from 'discord.js'
import { MemberSettings } from '../entities/MemberSettings'

declare module 'discord.js' {
  interface GuildMember {
    getSettings(): Promise<MemberSettings>
  }
}

export default Structures.extend('GuildMember', BaseClass => {
  return class extends BaseClass {
    public async getSettings (): Promise<MemberSettings> {
      if (typeof this.id !== 'string') throw new Error('Member id is unknown.')

      const settings = await MemberSettings.findOne({ id: this.id })

      if (!settings) return new MemberSettings(this)
      
      return settings
    }
  }
})
