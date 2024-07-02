import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Produto from "./produto";
import PedidoVenda from "./pedido_venda";

@Table({ tableName: "pedido_venda_itens", updatedAt: false })
export default class PedidoVendaItens extends SequelizeModel<PedidoVendaItens> {
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

  @ForeignKey(() => PedidoVenda)
  @Column({ field: "fk_pedido_venda_id", type: DataType.NUMBER })
  pedidoVendaId: number;

  @BelongsTo(() => PedidoVenda)
  pedidoVenda: PedidoVenda;
}