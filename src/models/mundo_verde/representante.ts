import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import Pessoa from "./pessoa";
import TipoRepresentante from "./tipo_representante";
import PrePedido from "./pre_pedido";
import PedidoCompra from "./pedido_compra";
import RelRepresentantePedidoCompra from "./rel_representante_pedido_compra";
import PedidoVenda from "./pedido_venda";
import RelVendedorGestorPedidoVenda from "./rel_vendedor_gestor_pedido_venda";
import RelVendedorPedidoVenda from "./rel_vendedor_pedido_venda";

@Table({ tableName: "representante", timestamps: false })
export default class Representante extends SequelizeModel<Representante> {
  @AllowNull(false)
  @Column({ type: DataType.CHAR })
  ativo: string;

  @ForeignKey(() => Pessoa)
  @Column({ field: "fk_pessoa_id", type: DataType.NUMBER })
  pessoaId: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;

  @ForeignKey(() => TipoRepresentante)
  @Column({ field: "fk_tipo_representante_id", type: DataType.NUMBER })
  tipoRepresentanteId: number;

  @BelongsTo(() => TipoRepresentante)
  tipoRepresentante: TipoRepresentante;

  @HasMany(() => PrePedido)
  prePedidos: PrePedido[];

  @HasMany(() => PedidoCompra)
  pedidosCompra: PedidoCompra[];

  @HasOne(() => RelRepresentantePedidoCompra)
  relRepresentantePedidoCompra: RelRepresentantePedidoCompra;

  @HasMany(() => PedidoVenda)
  pedidosVenda: PedidoVenda[];

  @HasMany(() => RelVendedorGestorPedidoVenda)
  relVendedorGestorPedidoVendas: RelVendedorGestorPedidoVenda[];

  @HasMany(() => RelVendedorGestorPedidoVenda)
  relVendedorGestorPedidoVendaVendedor: RelVendedorGestorPedidoVenda[];

  @HasMany(() => RelVendedorPedidoVenda)
  relVendedorPedidoVendas: RelVendedorPedidoVenda[];
}