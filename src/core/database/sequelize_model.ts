import { Moment } from "moment";
import { AutoIncrement, Column, DataType, DeletedAt, Model, PrimaryKey } from "sequelize-typescript";

export default class SequelizeModel<T> extends Model<T> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({ field: "created_at", type: DataType.DATE})
  createdAt: Moment;

  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt: Moment;

  @DeletedAt
  @Column({ field: "deleted_at", type: DataType.DATE})
  deletedAt: Moment;

  @Column({ field: "created_by", type: DataType.NUMBER})
  createdBy: number;

  @Column({ field: "updated_by", type: DataType.NUMBER})
  updatedBy: number;

  @Column({ field: "deleted_by", type: DataType.NUMBER})
  deletedBy: number;
}