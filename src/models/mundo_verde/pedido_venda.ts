import SequelizeModel from "@core/database/sequelize_model";
import { Moment } from "moment";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import Opcoes from "./opcao";
import Representante from "./representante";
import PedidoVendaItens from "./pedido_venda_itens";
import RelPedidoCompraPedidoVenda from "./rel_pedido_compra_pedido_venda";
import RelVendedorGestorPedidoVenda from "./rel_vendedor_gestor_pedido_venda";
import RelVendedorPedidoVenda from "./rel_vendedor_pedido_venda";
import RelPrePedidoPedidoVenda from "./rel_pre_pedido_pedido_venda";

@Table({ tableName: "pedido_venda", updatedAt: false })
export default class PedidoVenda extends SequelizeModel<PedidoVenda> {
  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(true)
  @Column({ field: "data_envio", type: DataType.DATE })
  dataEnvio: Moment;

  @AllowNull(true)
  @Column({ field: "valor_total", type: DataType.NUMBER })
  valorTotal: number;

  @AllowNull(true)
  @Column({ field: "valor_sub_total", type: DataType.NUMBER })
  valorSubTotal: number;

  @AllowNull(true)
  @Column({ field: "valor_desconto", type: DataType.NUMBER })
  valorDesconto: number;

  @AllowNull(true)
  @Column({ field: "data_recebimento", type: DataType.DATE })
  dataRecebimento: Moment;

  @ForeignKey(() => Opcoes)
  @Column({ field: "opcoes_status_id", type: DataType.NUMBER })
  opcoesStatusId: number;

  @BelongsTo(() => Opcoes)
  status: Opcoes;

  @ForeignKey(() => Representante)
  @Column({ field: "fk_representante_id", type: DataType.NUMBER })
  representanteId: number;

  @BelongsTo(() => Representante)
  representante: Representante;

  @HasMany(() => PedidoVendaItens)
  pedidoVendaItens: PedidoVendaItens[];

  @HasOne(() => RelPedidoCompraPedidoVenda)
  relPedidoCompraPedidoVenda: RelPedidoCompraPedidoVenda;

  @HasOne(() => RelVendedorGestorPedidoVenda)
  relVendedorGestorPedidoVenda: RelVendedorGestorPedidoVenda;

  @HasOne(() => RelVendedorPedidoVenda)
  relVendedorPedidoVenda: RelVendedorPedidoVenda;

  @HasOne(() => RelPrePedidoPedidoVenda)
  relPrePedidoPedidoVenda: RelPrePedidoPedidoVenda;
}