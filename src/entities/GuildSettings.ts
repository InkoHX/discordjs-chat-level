/* eslint-disable new-cap */
import { Guild } from 'discord.js'
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class GuildSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  public constructor (guild?: Guild) {
    super()

    if (guild) {
      this.id = guild.id
    }
  }
}
