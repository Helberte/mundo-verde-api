import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasOne, Table } from "sequelize-typescript";
import Opcoes from "./opcao";
import Empresa from "./empresa";
import Pessoa from "./pessoa";
import Bairro from "./bairro";
import Cidade from "./cidade";
import Estado from "./estado";

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

  @HasOne(() => Empresa)
  empresa: Empresa;

  @HasOne(() => Pessoa)
  pessoa: Pessoa;
}