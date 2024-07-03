import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Empresa from "./empresa";
import Endereco from "./endereco";

@Table({ tableName: "empresa_endereco", updatedAt: false })
export default class EmpresaEndereco extends SequelizeModel<EmpresaEndereco> {
  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa;

  @ForeignKey(() => Endereco)
  @Column({ field: "fk_endereco_id", type: DataType.NUMBER })
  enderecoId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;
}