import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAlergenoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({}, [
      rules.maxLength(255),
      rules.unique({ table: 'alergenos', column: 'nombre' }),
    ]),
  })

  public messages = {}
}
