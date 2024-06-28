import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Pessoa from "./pessoa";
import Funcao from "./funcao";
import FuncaoUsuario from "./funcao_usuario";
import Menu from "./menu";
import MenuUsuarioEspecifico from "./menu_usuario_especifico";
import Perfil from "./perfil";
import PerfilUsuario from "./perfil_usuario";
import Empresa from "./empresa";
import EmpresaUsuario from "./empresa_usuario";

@Table({ tableName: "usuario", timestamps: false })
export default class Usuario extends SequelizeModel<Usuario> {
  @AllowNull(false)
  @Column
  login: string;

  @AllowNull(false)
  @Column
  senha: string;

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  ativo: string;

  @ForeignKey(() => Pessoa)
  @Column({ field: "fk_pessoa_id", type: DataType.NUMBER })
  pessoaId: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;

  @BelongsToMany(() => Funcao, () => FuncaoUsuario)
  funcoes: Funcao[];

  @BelongsToMany(() => Menu, () => MenuUsuarioEspecifico)
  menusEspecificos: Menu[];

  @BelongsToMany(() => Perfil, () => PerfilUsuario)
  perfis: Perfil[];

  @BelongsToMany(() => Empresa, () => EmpresaUsuario)
  empresas: Empresa[];
}