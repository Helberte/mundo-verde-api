import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import PedidoVenda from "./pedido_venda";
import PrePedido from "./pre_pedido";

@Table({ tableName: "rel_pre_pedido_pedido_venda", timestamps: false })
export default class RelPrePedidoPedidoVenda extends SequelizeModel<RelPrePedidoPedidoVenda> {
  @ForeignKey(() => PedidoVenda)
  @Column({ field: "fk_pedido_venda_id", type: DataType.NUMBER })
  pedidoVendaId: number;

  @BelongsTo(() => PedidoVenda)
  pedidoVenda: PedidoVenda;

  @ForeignKey(() => PrePedido)
  @Column({ field: "fk_pre_pedido_id", type: DataType.NUMBER })
  prePedidoId: number;

  @BelongsTo(() => PrePedido)
  prePedido: PrePedido;
}