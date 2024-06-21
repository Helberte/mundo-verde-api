import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Empresa from "./empresa";
import Menu from "./menu";
import PerfilMenu from "./perfil_menu";
import Usuario from "./usuario";
import PerfilUsuario from "./perfil_usuario";

@Table({ tableName: "perfil" })
export default class Perfil extends SequelizeModel<Perfil> {
  
  @AllowNull(false)
  @Column
  nome: string;

  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa;

  @BelongsToMany(() => Menu, () => PerfilMenu)
  menus: Menu[];

  @BelongsToMany(() => Usuario, () => PerfilUsuario)
  usuarios: Usuario[];
}