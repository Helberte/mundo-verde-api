import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Produto from "./produto";
import PrePedido from "./pre_pedido";

@Table({ tableName: "pre_pedido_itens", updatedAt: false })
export default class PrePedidoItens extends SequelizeModel<PrePedidoItens> {
  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(true)
  @Column
  quantidade: number;

  @AllowNull(true)
  @Column({ field: "valor_total", type: DataType.NUMBER })
  valorTotal: number;

  @AllowNull(true)
  @Column({ field: "valor_sub_total", type: DataType.NUMBER })
  valorSubTotal: number;

  @AllowNull(true)
  @Column({ field: "valor_desconto", type: DataType.NUMBER })
  valorDesconto: number;

  @ForeignKey(() => Produto)
  @Column({ field: "fk_produto_id", type: DataType.NUMBER })
  produtoId: number;

  @BelongsTo(() => Produto)
  produto: Produto;

  @ForeignKey(() => PrePedido)
  @Column({ field: "fk_pre_pedido_id", type: DataType.NUMBER })
  prePedidoId: number;

  @BelongsTo(() => PrePedido)
  prePedido: PrePedido;
}