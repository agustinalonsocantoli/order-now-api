import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos_alergenos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.uuid('producto_id').references('id').inTable('productos').onDelete('CASCADE').index()
      table.uuid('alergeno_id').references('id').inTable('alergenos').onDelete('CASCADE').index()
      table.unique(['producto_id', 'alergeno_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
