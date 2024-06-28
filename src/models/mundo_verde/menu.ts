import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsToMany, Column, Table } from "sequelize-typescript";
import Usuario from "./usuario";
import MenuUsuarioEspecifico from "./menu_usuario_especifico";
import Perfil from "./perfil";
import PerfilMenu from "./perfil_menu";

@Table({ tableName: "menu", timestamps: false })
export default class Menu extends SequelizeModel<Menu> {

  @AllowNull(false)
  @Column
  nome: string

  @AllowNull(false)
  @Column
  descricao: string

  @AllowNull(false)
  @Column
  pai: number

  @AllowNull(false)
  @Column
  ordem: number

  @BelongsToMany(() => Usuario, () => MenuUsuarioEspecifico)
  usuariosEspecificos: Usuario[];

  @BelongsToMany(() => Perfil, () => PerfilMenu)
  perfis: Perfil[];
}