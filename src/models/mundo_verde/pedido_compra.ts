import SequelizeModel from "@core/database/sequelize_model";
import { Moment } from "moment";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import Opcoes from "./opcao";
import Representante from "./representante";
import PedidoCompraItens from "./pedido_compra_itens";
import RelPrePedidoPedidoCompra from "./rel_pre_pedido_pedido_compra";
import RelRepresentantePedidoCompra from "./rel_representante_pedido_compra";

@Table({ tableName: "pedido_compra" })
export default class PedidoCompra extends SequelizeModel<PedidoCompra> {
  @AllowNull(true)
  @Column
  observacao: string;

  @AllowNull(true)
  @Column({ field: "data_envio", type: DataType.DATE })
  dataEnvio: Moment;

  @ForeignKey(() => Opcoes)
  @Column({ field: "opcoes_status_id", type: DataType.NUMBER })
  opcoesStatusId: number;

  @BelongsTo(() => Opcoes)
  status: Opcoes;

  @AllowNull(true)
  @Column({ field: "valor_total", type: DataType.NUMBER })
  valorTotal: number;

  @AllowNull(true)
  @Column({ field: "valor_sub_total", type: DataType.NUMBER })
  valorSubTotal: number;

  @AllowNull(true)
  @Column({ field: "valor_desconto", type: DataType.NUMBER })
  valorDesconto: number;

  @ForeignKey(() => Representante)
  @Column({ field: "fk_representante_id", type: DataType.NUMBER })
  representanteId: number;

  @BelongsTo(() => Representante)
  representante: Representante;

  @HasMany(() => PedidoCompraItens)
  pedidoCompraItens: PedidoCompraItens[];

  @HasOne(() => RelPrePedidoPedidoCompra)
  relPrePedidoPedidoCompra: RelPrePedidoPedidoCompra;

  @HasOne(() => RelRepresentantePedidoCompra)
  relRepresentantePedidoCompra: RelRepresentantePedidoCompra;
}