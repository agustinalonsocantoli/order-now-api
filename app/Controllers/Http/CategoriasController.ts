import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import CreateCategoriaValidator from 'App/Validators/CreateCategoriaValidator'
import UpdateCategoriaValidator from 'App/Validators/UpdateCategoriaValidator'

export default class CategoriasController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = 10
      const categoria = await Categoria.query().preload('productos').paginate(page, limit)

      response.ok({
        data: categoria,
      })
    } catch (e) {
      response.badRequest()
    }
  } // GET

  public async store({ response, request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateCategoriaValidator)

      const newCategoria = await Categoria.create(validatedData)

      response.ok({
        data: newCategoria,
      })
    } catch (e) {
      response.badRequest(e)
    }
  } // POST

  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const categoria = await Categoria.findOrFail(id)

      response.ok({
        data: categoria,
      })
    } catch (e) {
      response.badRequest()
    }
  } // GET PARAMS

  public async update({ params: { id }, response, request }: HttpContextContract) {
    try {
      const categoria = await Categoria.findOrFail(id)

      const validatedData = await request.validate(UpdateCategoriaValidator)

      categoria.merge(validatedData)

      response.ok({
        data: categoria,
      })
    } catch (e) {
      response.badRequest()
    }
  } // PUT

  public async destroy({ response, params: { id } }: HttpContextContract) {
    try {
      const categoria = await Categoria.findOrFail(id)

      categoria.delete()

      response.ok({
        data: categoria,
      })
    } catch (e) {
      response.badRequest()
    }
  } // DELETE
}
