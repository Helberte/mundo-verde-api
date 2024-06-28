import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import PedidoCompra from "./pedido_compra";
import PedidoVenda from "./pedido_venda";

@Table({ tableName: "rel_pedido_compra_pedido_venda", timestamps: false })
export default class RelPedidoCompraPedidoVenda extends SequelizeModel<RelPedidoCompraPedidoVenda> {
  @ForeignKey(() => PedidoCompra)
  @Column({ field: "fk_pedido_compra_id", type: DataType.NUMBER })
  pedidoCompraId: number;

  @BelongsTo(() => PedidoCompra)
  pedidoCompra: PedidoCompra;

  @ForeignKey(() => PedidoVenda)
  @Column({ field: "fk_pedido_venda_id", type: DataType.NUMBER })
  pedidoVendaId: number;

  @BelongsTo(() => PedidoVenda)
  pedidoVenda: PedidoVenda;
}