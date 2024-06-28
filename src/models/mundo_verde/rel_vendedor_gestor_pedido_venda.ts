import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Representante from "./representante";
import PedidoVenda from "./pedido_venda";

@Table({ tableName: "rel_vendedor_gestor_pedido_venda", timestamps: false })
export default class RelVendedorGestorPedidoVenda extends SequelizeModel<RelVendedorGestorPedidoVenda> {
  @ForeignKey(() => Representante)
  @Column({ field: "fk_gestor_id", type: DataType.NUMBER })
  gestorId: number;

  @BelongsTo(() => Representante)
  gestor: Representante;

  @ForeignKey(() => Representante)
  @Column({ field: "fk_vendedor_id", type: DataType.NUMBER })
  vendedorId: number;

  @BelongsTo(() => Representante)
  vendedor: Representante;

  @ForeignKey(() => PedidoVenda)
  @Column({ field: "fk_pedido_venda_id", type: DataType.NUMBER })
  pedidoVendaId: number;

  @BelongsTo(() => PedidoVenda)
  pedidoVenda: PedidoVenda;
}