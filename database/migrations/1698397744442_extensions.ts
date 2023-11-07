import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Extensions extends BaseSchema {
  public async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  }

  public async down() {}
}
