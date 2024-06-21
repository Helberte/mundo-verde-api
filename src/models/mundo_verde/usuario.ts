import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey } from "sequelize-typescript";
import Pessoa from "./pessoa";
import Funcao from "./funcao";
import FuncaoUsuario from "./funcao_usuario";
import Menu from "./menu";
import MenuUsuarioEspecifico from "./menu_usuario_especifico";

export default class Usuario extends SequelizeModel<Usuario> {
  @AllowNull(false)
  login: string;

  @AllowNull(false)
  senha: string;

  @AllowNull(false)
  nome: string;

  @AllowNull(false)
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
}