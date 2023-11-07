import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('nombre').notNullable().unique()
      table.boolean('publicado')
      table.integer('orden').notNullable()
      table.decimal('precio').notNullable()
      table.text('descripcion')
      table.json('imagen')
      table.uuid('categoria_id').references('id').inTable('categorias').onDelete('CASCADE').index()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
