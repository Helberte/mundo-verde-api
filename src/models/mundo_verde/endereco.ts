import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey } from "sequelize-typescript";
import Opcoes from "./opcao";

export default class Endereco extends SequelizeModel<Endereco> {

  @AllowNull(false)
  @Column
  rua: string;

  @AllowNull(false)
  @Column
  numero: string;

  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(true)
  @Column
  complemento: string;
  
  @ForeignKey(() => Opcoes)
  @Column({ field: "opcoes_tipo_id", type: DataType.NUMBER })
  opcoesTipoId: number;

  @BelongsTo(() => Opcoes)
  opcoesTipo: Opcoes;

  // um endereço só possui uma empresa, falta este relacionamento de endereço para empresa
  // aqui!!!
}