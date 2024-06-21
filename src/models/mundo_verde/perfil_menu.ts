import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Menu from "./menu";
import Perfil from "./perfil";

@Table({ tableName: "perfil_menu" })
export default class PerfilMenu extends SequelizeModel<PerfilMenu> {

  @ForeignKey(() => Menu)
  @Column({ field: "fk_menu_id", type: DataType.NUMBER })
  menuId: number;

  @ForeignKey(() => Perfil)
  @Column({ field: "fk_perfil_id", type: DataType.NUMBER })
  perfilId: number;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;
}