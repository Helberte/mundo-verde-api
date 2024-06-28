import { Moment } from "moment";
import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";

export default class SequelizeModel<T> extends Model<T> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

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
  createdBy: string;

  @Column({ field: "updated_by", type: DataType.STRING})
  updatedBy: string;

  @Column({ field: "deleted_by", type: DataType.STRING})
  deletedBy: string;
}