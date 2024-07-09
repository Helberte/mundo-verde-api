import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Endereco from "./endereco";
import Pessoa from "./pessoa";

@Table({ tableName: "pessoa_endereco", updatedAt: false })
export default class PessoaEndereco extends SequelizeModel<PessoaEndereco> {
  @ForeignKey(() => Pessoa)
  @Column({ field: "fk_pessoa_id", type: DataType.NUMBER })
  pessoaId: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;

  @ForeignKey(() => Endereco)
  @Column({ field: "fk_endereco_id", type: DataType.NUMBER })
  enderecoId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;
}