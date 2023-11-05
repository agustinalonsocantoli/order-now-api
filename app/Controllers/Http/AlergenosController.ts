import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Alergeno from 'App/Models/Alergeno'
import CreateAlergenoValidator from 'App/Validators/CreateAlergenoValidator'
import UpdateAlergenoValidator from 'App/Validators/UpdateAlergenoValidator'

export default class AlergenosController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = 10
      const alergeno = await Alergeno.query().paginate(page, limit)

      response.ok({
        data: alergeno,
      })
    } catch (e) {
      response.badRequest()
    }
  } // GET

  public async store({ response, request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateAlergenoValidator)

      const newAlergeno = await Alergeno.create(validatedData)

      response.ok({
        data: newAlergeno,
      })
    } catch (e) {
      response.badRequest(e)
    }
  } // POST

  public async update({ params: { id }, response, request }: HttpContextContract) {
    try {
      const alergeno = await Alergeno.findOrFail(id)

      const validatedData = await request.validate(UpdateAlergenoValidator)

      alergeno.merge(validatedData).save()

      response.ok({
        data: validatedData,
      })
    } catch (e) {
      response.badRequest()
    }
  } // PUT

  public async destroy({ response, params: { id } }: HttpContextContract) {
    try {
      const alergeno = await Alergeno.findOrFail(id)

      alergeno.delete()

      response.ok({
        data: alergeno,
      })
    } catch (e) {
      response.badRequest()
    }
  } // DELETE
}
