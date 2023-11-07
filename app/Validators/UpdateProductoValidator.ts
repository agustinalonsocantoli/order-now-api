import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string.optional({}),
    publicado: schema.boolean.optional(),
    orden: schema.number.optional(),
    precio: schema.number.optional(),
    descripcion: schema.string.optional(),
    categoriaId: schema.string.optional([
      rules.uuid(),
      rules.exists({ table: 'categorias', column: 'id' }),
    ]),
    alergenos: schema.array.optional().members(schema.string()),
  })

  public messages = {}
}
