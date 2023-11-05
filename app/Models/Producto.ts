import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'
import Alergeno from './Alergeno'

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public publicado: boolean

  @column()
  public orden: number

  @column()
  public precio: number

  @column()
  public descripcion: string

  @column()
  public categoriaId: number

  @belongsTo(() => Categoria)
  public categoria: BelongsTo<typeof Categoria>

  @manyToMany(() => Alergeno, {
    pivotTable: 'productos_alergenos',
    pivotTimestamps: true,
  })
  public alergenos: ManyToMany<typeof Alergeno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
