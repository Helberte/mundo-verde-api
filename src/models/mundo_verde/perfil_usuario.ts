import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Usuario from "./usuario";
import Perfil from "./perfil";

@Table({ tableName: "perfil_usuario", updatedAt: false })
export default class PerfilUsuario extends SequelizeModel<PerfilUsuario> {

  @ForeignKey(() => Usuario)
  @Column({ field: "fk_usuario_id", type: DataType.NUMBER })
  usuarioId: number;

  @ForeignKey(() => Perfil)
  @Column({ field: "fk_perfil_id", type: DataType.NUMBER })
  perfilId: number;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;
}