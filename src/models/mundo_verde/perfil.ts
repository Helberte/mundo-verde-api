import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey } from "sequelize-typescript";
import Empresa from "./empresa";

export default class Perfil extends SequelizeModel<Perfil> {
  
  @AllowNull(false)
  @Column
  nome: string;

  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa;
}