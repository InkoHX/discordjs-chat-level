import { Client } from '..'

export default class Structure {
  public readonly client: Client

  public constructor (client: Client) {
    this.client = client
  }
}
