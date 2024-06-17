import { Moment } from "moment";
import { Table, Column, Model, AutoIncrement, PrimaryKey, AllowNull, DataType, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({ tableName: "estado" })
export default class Estado extends Model<Estado> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  nome: string

  @AllowNull(false)
  @Column
  uf: string

  @AllowNull(false)
  @Column
  ibge_id: number

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE})
  createdAt: Moment;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE})
  updatedAt: Moment;

  @DeletedAt
  @Column({ field: "deleted_at", type: DataType.DATE})
  deletedAt: Moment;

  @Column({ field: "created_by", type: DataType.STRING})
  createdBy: Moment;

  @Column({ field: "updated_by", type: DataType.STRING})
  updatedBy: Moment;

  @Column({ field: "deleted_by", type: DataType.STRING})
  deletedBy: Moment;
}