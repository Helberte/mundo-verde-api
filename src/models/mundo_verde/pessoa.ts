import SequelizeModel from "@core/database/sequelize_model";
import { Moment } from "moment";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Table } from "sequelize-typescript";
import Empresa from "./empresa";
import EmpresaPessoa from "./empresa_pessoa";
import Usuario from "./usuario";
import Representante from "./representante";
import Opcoes from "./opcao";
import PessoaEndereco from "./pessoa_endereco";

@Table({ tableName: "pessoa", updatedAt: false })
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

  @ForeignKey(() => Opcoes)
  @Column({ field: "opcoes_sexo_id", type: DataType.NUMBER })
  opcoesSexoId: number;

  @BelongsTo(() => Opcoes)
  sexo: Opcoes;

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

  @BelongsToMany(() => Empresa, () => EmpresaPessoa)
  empresas: Empresa[];

  @HasOne(() => Usuario)
  usuario: Usuario;

  @HasOne(() => Representante)
  representante: Representante;

  @HasOne(() => PessoaEndereco)
  pessoaEndereco: PessoaEndereco;
}