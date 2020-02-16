/* eslint-disable new-cap */
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'
import { Guild } from 'discord.js'

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
