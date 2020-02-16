/* eslint-disable new-cap */
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'
import { GuildMember } from 'discord.js'

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
