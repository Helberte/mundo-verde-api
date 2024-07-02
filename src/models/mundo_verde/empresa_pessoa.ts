import SequelizeModel from "@core/database/sequelize_model";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Pessoa from "./pessoa";
import Empresa from "./empresa";

@Table({ tableName: "empresa_pessoa", updatedAt: false })
export default class EmpresaPessoa extends SequelizeModel<EmpresaPessoa> {

  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @ForeignKey(() => Pessoa)
  @Column({ field: "fk_pessoa_id", type: DataType.NUMBER })
  pessoaId: number;
}