/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable new-cap */
import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm'
import { User } from 'discord.js'

@Entity()
export class UserSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  @Column()
  public level: number = 1

  @Column()
  public exp: number = 0

  @Column()
  public maxExp: number = 100

  public constructor (user?: User) {
    super()

    if (user) {
      this.id = user.id
    }
  }
}
