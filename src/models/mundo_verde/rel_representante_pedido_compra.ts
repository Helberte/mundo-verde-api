import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import PedidoCompra from "./pedido_compra";
import Representante from "./representante";

@Table({ tableName: "rel_representante_pedido_compra", timestamps: false })
export default class RelRepresentantePedidoCompra extends SequelizeModel<RelRepresentantePedidoCompra> {
  @ForeignKey(() => Representante)
  @Column({ field: "fk_representante_id", type: DataType.NUMBER })
  representanteId: number;

  @BelongsTo(() => Representante)
  representante: Representante;

  @ForeignKey(() => PedidoCompra)
  @Column({ field: "fk_pedido_compra_id", type: DataType.NUMBER })
  pedidoCompraId: number;

  @BelongsTo(() => PedidoCompra)
  pedidoCompra: PedidoCompra;
}