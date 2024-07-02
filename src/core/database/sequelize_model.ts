import moment, { Moment } from "moment";
import { AutoIncrement, BeforeFind, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";

export default class SequelizeModel<T> extends Model<T> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE})
  createdAt: Moment;

  @UpdatedAt
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

  @BeforeFind
  static formatDates(instance: SequelizeModel<any>) {
    if (instance.createdAt) {
      instance.createdAt = moment(instance.createdAt, "YYYY-MM-DD HH:mm:ss");
    }
    if (instance.updatedAt) {
      instance.updatedAt = moment(instance.updatedAt, "YYYY-MM-DD HH:mm:ss");
    }
    if (instance.deletedAt) {
      instance.deletedAt = moment(instance.deletedAt, "YYYY-MM-DD HH:mm:ss");
    }
  }
}