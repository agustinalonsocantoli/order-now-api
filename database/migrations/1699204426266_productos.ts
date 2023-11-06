import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('imagen')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('imagen')
    })
  }
}
