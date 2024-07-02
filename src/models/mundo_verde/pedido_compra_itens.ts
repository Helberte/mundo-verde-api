import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import PedidoCompra from "./pedido_compra";
import Produto from "./produto";

@Table({ tableName: "pedido_compra_itens", updatedAt: false})
export default class PedidoCompraItens extends SequelizeModel<PedidoCompraItens> {
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

  @ForeignKey(() => PedidoCompra)
  @Column({ field: "fk_pedido_compra_id", type: DataType.NUMBER })
  pedidoCompraId: number;

  @BelongsTo(() => PedidoCompra)
  pedidoCompra: PedidoCompra;

  @ForeignKey(() => Produto)
  @Column({ field: "fk_produto_id", type: DataType.NUMBER })
  produtoId: number;

  @BelongsTo(() => Produto)
  produto: Produto;
}