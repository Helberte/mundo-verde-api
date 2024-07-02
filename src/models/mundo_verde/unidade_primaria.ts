import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, HasMany, Table } from "sequelize-typescript";
import Produto from "./produto";

@Table({ tableName: "unidade_primaria", updatedAt: false })
export default class UnidadePrimaria extends SequelizeModel<UnidadePrimaria> {

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  descricao: string;

  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @HasMany(() => Produto)
  produtos: Produto[];
}