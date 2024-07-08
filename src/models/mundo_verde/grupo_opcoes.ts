import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import Empresa from "./empresa";
import Opcoes from "./opcao";

export enum GruposDeOpcoes {
  TiposEndereco = 1
}

@Table({ tableName: "grupo_opcoes", updatedAt: false })
export default class GrupoOpcoes extends SequelizeModel<GrupoOpcoes> {

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(false)
  @Column({ type: DataType.CHAR })
  editavel: string;

  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa

  @HasMany(() => Opcoes)
  opcoes: Opcoes[];
}