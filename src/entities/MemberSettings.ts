/* eslint-disable new-cap */
import { GuildMember } from 'discord.js'
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class MemberSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  public constructor (member?: GuildMember) {
    super()

    if (member) {
      this.id = member.id
    }
  }
}
