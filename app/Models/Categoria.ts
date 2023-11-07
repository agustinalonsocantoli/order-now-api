import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nombre: string

  @column()
  public publicada: boolean

  @column()
  public orden: number

  @hasMany(() => Producto)
  public productos: HasMany<typeof Producto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
