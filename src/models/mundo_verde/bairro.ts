import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Cidade from "./cidade";

@Table({ tableName: "bairro", timestamps: false })
export default class Bairro extends SequelizeModel<Bairro> {

  @AllowNull(false)
  @Column
  nome: string;

  @ForeignKey(() => Cidade)
  @Column({ field: "fk_cidade_id", type: DataType.NUMBER })
  cidadeId: number;

  @BelongsTo(() => Cidade)
  cidade: Cidade;
}