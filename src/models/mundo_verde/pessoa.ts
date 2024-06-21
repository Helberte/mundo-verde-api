import SequelizeModel from "@core/database/sequelize_model";
import { Moment } from "moment";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Table } from "sequelize-typescript";
import Endereco from "./endereco";
import Empresa from "./empresa";
import EmpresaPessoa from "./empresa_pessoa";
import Usuario from "./usuario";

@Table({ tableName: "pessoa" })
export default class Pessoa extends SequelizeModel<Pessoa> {
  
  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(true)
  @Column
  sobrenome: string;

  @AllowNull(false)
  @Column
  cpf: string;

  @AllowNull(false)
  @Column({ field: "data_nascimento", type: DataType.DATE })
  dataNascimento: Moment;

  @AllowNull(false)
  @Column({ field: "opcoes_sexo_id", type: DataType.NUMBER })
  opcoesSexoId: number;

  @AllowNull(true)
  @Column
  email: string;

  @AllowNull(true)
  @Column({ field: "telefone_1", type: DataType.STRING })
  telefone1: string;

  @AllowNull(true)
  @Column({ field: "telefone_2", type: DataType.STRING })
  telefone2: string;

  @AllowNull(true)
  @Column
  rg: string;

  @ForeignKey(() => Endereco)
  @Column({ field: "fk_endereco_id", type: DataType.NUMBER })
  enderecoId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;

  @BelongsToMany(() => Empresa, () => EmpresaPessoa)
  empresas: Empresa[];

  @HasOne(() => Usuario)
  usuario: Usuario;
}