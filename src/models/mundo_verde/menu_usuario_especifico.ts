import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Menu from "./menu";
import Usuario from "./usuario";

@Table({ tableName: "menu_usuario_especifico", timestamps: false })
export default class MenuUsuarioEspecifico extends SequelizeModel<MenuUsuarioEspecifico> {

  @ForeignKey(() => Menu)
  @Column({ field: "fk_menu_id", type: DataType.NUMBER })
  menuId: number;

  @ForeignKey(() => Usuario)
  @Column({ field: "fk_usuario_id", type: DataType.NUMBER })
  usuarioId: number;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;
}