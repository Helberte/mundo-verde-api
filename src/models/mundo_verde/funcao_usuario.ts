import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Usuario from "./usuario";
import Funcao from "./funcao";

@Table({ tableName: "funcao_usuario", updatedAt: false })
export default class FuncaoUsuario extends SequelizeModel<FuncaoUsuario> {

  @ForeignKey(() => Usuario)
  @Column({ field: "fk_usuario_id", type: DataType.NUMBER })
  usuarioId: number;

  @ForeignKey(() => Funcao)
  @Column({ field: "fk_funcao_id", type: DataType.NUMBER })
  funcaoId: number;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;
}