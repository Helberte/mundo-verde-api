import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "sequencial", timestamps: false })
export default class Sequencial extends SequelizeModel<Sequencial> {

  @AllowNull(false)
  @Column
  tabela: string;

  @AllowNull(false)
  @Column
  campo: string;

  @AllowNull(false)
  @Column
  sequencial: string;

  @AllowNull(false)
  @Column({ field: "fk_campo_id", type: DataType.NUMBER })
  campoId: number;
}