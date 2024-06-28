import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import Produto from "./produto";
import TipoRepresentante from "./tipo_representante";

@Table({ tableName: "composicao_preco", timestamps: false })
export default class ComposicaoPreco extends SequelizeModel<ComposicaoPreco> {

  @AllowNull(false)
  @Column
  custo: number;

  @AllowNull(false)
  @Column
  venda: number;

  @AllowNull(false)
  @Column
  markup: string;

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  ordem: number;

  @AllowNull(false)
  @Column
  ativo: string;

  @AllowNull(false)
  @Column({ field: "despesas_fixas", type: DataType.NUMBER })
  despesasFixas: number;

  @AllowNull(false)
  @Column({ field: "despesas_variaveis", type: DataType.NUMBER })
  despesasVariaveis: number;

  @AllowNull(false)
  @Column({ field: "lucro_pretendido", type: DataType.NUMBER })
  lucroPretendido: number;

  @ForeignKey(() => Produto)
  @Column({ field: "fk_produto_id", type: DataType.NUMBER })
  produtoId: number;

  @BelongsTo(() => Produto)
  produto: Produto;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @HasMany(() => TipoRepresentante)
  tipoRepresentante: TipoRepresentante[];
}