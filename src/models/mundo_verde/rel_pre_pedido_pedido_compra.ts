import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import PedidoCompra from "./pedido_compra";
import PrePedido from "./pre_pedido";

@Table({ tableName: "rel_pre_pedido_pedido_compra" })
export default class RelPrePedidoPedidoCompra extends SequelizeModel<RelPrePedidoPedidoCompra> {
  @ForeignKey(() => PedidoCompra)
  @Column({ field: "fk_pedido_compra_id", type: DataType.NUMBER })
  pedidoCompraId: number;

  @BelongsTo(() => PedidoCompra)
  pedidoCompra: PedidoCompra;

  @ForeignKey(() => PrePedido)
  @Column({ field: "fk_pre_pedido_id", type: DataType.NUMBER })
  prePedidoId: number;

  @BelongsTo(() => PrePedido)
  prePedido: PrePedido;
}