import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasOne, Table } from "sequelize-typescript";
import Opcoes from "./opcao";
import Bairro from "./bairro";
import Cidade from "./cidade";
import Estado from "./estado";
import EmpresaEndereco from "./empresa_endereco";
import PessoaEndereco from "./pessoa_endereco";

@Table({ tableName: "endereco", updatedAt: false })
export default class Endereco extends SequelizeModel<Endereco> {
  @AllowNull(false)
  @Column
  rua: string;

  @AllowNull(false)
  @Column
  numero: string;

  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(true)
  @Column
  complemento: string;

  @AllowNull(true)
  @Column
  cep: string;

  @ForeignKey(() => Opcoes)
  @Column({ field: "opcoes_tipo_id", type: DataType.NUMBER })
  opcoesTipoId: number;

  @ForeignKey(() => Bairro)
  @Column({ field: "fk_bairro_id", type: DataType.NUMBER })
  bairroId: number;

  @ForeignKey(() => Cidade)
  @Column({ field: "fk_cidade_id", type: DataType.NUMBER })
  cidadeId: number;

  @ForeignKey(() => Estado)
  @Column({ field: "fk_estado_id", type: DataType.NUMBER })
  estadoId: number;

  @BelongsTo(() => Bairro)
  bairro: Bairro;

  @BelongsTo(() => Cidade)
  cidade: Cidade;

  @BelongsTo(() => Estado)
  estado: Estado;

  @BelongsTo(() => Opcoes)
  opcoesTipo: Opcoes;

  @HasOne(() => EmpresaEndereco)
  empresaEndereco: EmpresaEndereco;

  @HasOne(() => PessoaEndereco)
  pessoaEndereco: PessoaEndereco;
}