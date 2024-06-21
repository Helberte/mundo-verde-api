import SequelizeModel from "@core/database/sequelize_model";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Usuario from "./usuario";
import Empresa from "./empresa";

@Table({ tableName: "empresa_usuario" })
export default class EmpresaUsuario extends SequelizeModel<EmpresaUsuario> {

  @ForeignKey(() => Usuario)
  @Column({ field: "fk_usuario_id", type: DataType.NUMBER })
  usuarioId: number;

  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;
}