import SequelizeModel from "@core/database/sequelize_model";
import { Moment } from "moment";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import Representante from "./representante";
import Opcoes from "./opcao";
import PrePedidoItens from "./pre_pedido_itens";
import RelPrePedidoPedidoCompra from "./rel_pre_pedido_pedido_compra";
import RelPrePedidoPedidoVenda from "./rel_pre_pedido_pedido_venda";

@Table({ tableName: "pre_pedido", timestamps: false })
export default class PrePedido extends SequelizeModel<PrePedido> {
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

  @ForeignKey(() => Representante)
  @Column({ field: "fk_representante_id", type: DataType.NUMBER })
  representanteId: number;

  @BelongsTo(() => Representante)
  representante: Representante;

  @ForeignKey(() => Opcoes)
  @Column({ field: "fk_opcoes_status_id", type: DataType.NUMBER })
  opcoesStatusId: number;

  @BelongsTo(() => Opcoes)
  status: Opcoes;

  @HasMany(() => PrePedidoItens)
  prePedidoItens: PrePedidoItens[];

  @HasOne(() => RelPrePedidoPedidoCompra)
  relPrePedidoPedidoCompra: RelPrePedidoPedidoCompra;

  @HasOne(() => RelPrePedidoPedidoVenda)
  relPrePedidoPedidoVenda: RelPrePedidoPedidoVenda;
}