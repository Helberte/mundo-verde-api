import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey } from "sequelize-typescript";
import Cidade from "./cidade";

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