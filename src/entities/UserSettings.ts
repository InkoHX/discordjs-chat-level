/* eslint-disable new-cap */
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'
import { User } from 'discord.js'

@Entity()
export class UserSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  public constructor (user?: User) {
    super()

    if (user) {
      this.id = user.id
    }
  }
}
