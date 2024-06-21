import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "unidade_primaria" })
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
}