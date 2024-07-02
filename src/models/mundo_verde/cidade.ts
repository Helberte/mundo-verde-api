import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import Estado from "./estado";
import Bairro from "./bairro";

@Table( { tableName: "cidade", updatedAt: false } )
export default class Cidade extends SequelizeModel<Cidade> {

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column({ field: "ibge_id", type: DataType.NUMBER })
  ibgeId: number;

  @ForeignKey(() => Estado)
  @Column({ field: "fk_estado_id", type: DataType.NUMBER})
  estadoId: number;

  @BelongsTo(() => Estado)
  estado: Estado;

  @HasMany(() => Bairro)
  bairros: Bairro[];
}