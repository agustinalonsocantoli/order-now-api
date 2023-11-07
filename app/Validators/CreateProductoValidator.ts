import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({}),
    publicado: schema.boolean(),
    orden: schema.number(),
    precio: schema.number(),
    descripcion: schema.string.optional(),
    categoriaId: schema.string([rules.uuid(), rules.exists({ table: 'categorias', column: 'id' })]),
    alergenos: schema.array.optional().members(schema.string()),
  })

  public messages = {}
}
