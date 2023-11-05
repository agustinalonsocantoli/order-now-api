import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre').notNullable().unique()
      table.boolean('publicado')
      table.integer('orden').notNullable()
      table.decimal('precio').notNullable()
      table.text('descripcion')
      table.integer('categoria_id').references('categorias.id').unsigned().index()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
