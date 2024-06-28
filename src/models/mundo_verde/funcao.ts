import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsToMany, Column, DataType, Table } from "sequelize-typescript";
import Usuario from "./usuario";
import FuncaoUsuario from "./funcao_usuario";

@Table({ tableName: "funcao", timestamps: false })
export default class Funcao extends SequelizeModel<Funcao> {
  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  descricao: string;

  @AllowNull(false)
  @Column
  codigo: string;

  @AllowNull(false)
  @Column({field: "fk_empresa_id", type: DataType.NUMBER})
  empresaId: number;

  @BelongsToMany(() => Usuario, () => FuncaoUsuario)
  usuarios: Usuario[];
}