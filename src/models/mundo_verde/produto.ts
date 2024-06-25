import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import UnidadePrimaria from "./unidade_primaria";
import ComposicaoPreco from "./composicao_preco";
import PrePedidoItens from "./pre_pedido_itens";
import PedidoCompraItens from "./pedido_compra_itens";
import PedidoVendaItens from "./pedido_venda_itens";

@Table({ tableName: "produto" })
export default class Produto extends SequelizeModel<Produto> {
  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(true)
  @Column
  peso: number;

  @AllowNull(true)
  @Column({ field: "modo_usar", type: DataType.STRING })
  modoUsar: string;

  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(true)
  @Column
  composicao: string;

  @AllowNull(false)
  @Column
  ativo: string;

  @AllowNull(false)
  @Column
  comercializa: string;

  @AllowNull(false)
  @Column
  descricao: string;

  @ForeignKey(() => UnidadePrimaria)
  @Column({ field: "fk_unidade_primaria_id", type: DataType.NUMBER })
  unidadePrimariaId: number;

  @BelongsTo(() => UnidadePrimaria)
  unidadePrimaria: UnidadePrimaria;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @HasMany(() => ComposicaoPreco)
  composicoesPreco: ComposicaoPreco[];

  @HasMany(() => PrePedidoItens)
  prePedidoItens: PrePedidoItens[];

  @HasMany(() => PedidoCompraItens)
  pedidoCompraItens: PedidoCompraItens[];

  @HasMany(() => PedidoVendaItens)
  pedidoVendaItens: PedidoVendaItens[];
}