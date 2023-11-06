import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/Producto'
import CreateProductoValidator from 'App/Validators/CreateProductoValidator'
import UpdateProductoValidator from 'App/Validators/UpdateProductoValidator'

export default class ProductosController {
  public async index({ response, request }: HttpContextContract) {
    try {
      const alergenos = request.input('alergenos')
      const page = request.input('page', 1)
      const limit = 10

      const productos = await Producto.query()
        .preload('categoria')
        .preload('alergenos')
        .if(alergenos, (query) =>
          query.whereHas('alergenos', (query) => {
            query.whereIn('alergenos.id', alergenos.split(','))
          })
        )
        .paginate(page, limit)

      response.ok({
        data: productos,
      })
    } catch (e) {
      console.log(e)
      response.badRequest(e)
    }
  } // GET

  public async store({ response, request }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateProductoValidator)
      const imagen = request.file('imagen')!

      const newProducto = await Producto.create(validatedData)

      if (imagen) {
        newProducto.imagen = await ResponsiveAttachment.fromFile(imagen)
        await newProducto.save()
      }

      if (validatedData.alergenos) {
        newProducto.related('alergenos').sync(validatedData.alergenos)

        await newProducto.save()
      }

      response.ok({
        data: newProducto,
      })
    } catch (e) {
      response.badRequest(e)
    }
  } // POST

  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const producto = await Producto.findOrFail(id)

      response.ok({
        data: producto,
      })
    } catch (e) {
      response.badRequest()
    }
  } // GET PARAMS

  public async update({ params: { id }, response, request }: HttpContextContract) {
    try {
      const producto = await Producto.findOrFail(id)
      const imagen = request.file('imagen')!
      const borraImagen = request.input('borraImagen')

      const validatedData = await request.validate(UpdateProductoValidator)

      producto.merge(validatedData)

      if (imagen) {
        producto.imagen = await ResponsiveAttachment.fromFile(imagen)
      } else {
        if (borraImagen === null && borraImagen !== undefined) producto.imagen = null
      }

      if (validatedData.alergenos) {
        producto.related('alergenos').sync(validatedData.alergenos)

        await producto.save()
      }

      producto.save()
      await producto.load('alergenos')

      response.ok({
        data: producto,
      })
    } catch (e) {
      console.log(e)
      response.badRequest(e)
    }
  } // PUT

  public async destroy({ response, params: { id } }: HttpContextContract) {
    try {
      const producto = await Producto.findOrFail(id)

      producto.delete()

      response.ok({
        data: producto,
      })
    } catch (e) {
      response.badRequest()
    }
  } // DELETE
}
