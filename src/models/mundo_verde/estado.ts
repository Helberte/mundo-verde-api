import { Moment } from "moment";
import { Table, Column, Model, AutoIncrement, PrimaryKey, AllowNull } from "sequelize-typescript";

@Table({ tableName: "estado" })
export default class Estado extends Model {

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

  @AllowNull(false)
  @Column("created_at")
  createdAt: Moment;

  @Column("updated_at")
  updatedAt: Moment;

  @Column("deleted_at")
  deletedAt: Moment;

  @Column("created_by")
  createdBy: Moment;

  @Column("updated_by")
  updatedBy: Moment;

  @Column("deleted_by")
  deletedBy: Moment;
}