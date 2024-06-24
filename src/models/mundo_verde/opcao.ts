import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import GrupoOpcoes from "./grupo_opcoes";
import Empresa from "./empresa";
import Endereco from "./endereco";
import PrePedido from "./pre_pedido";
import PedidoCompra from "./pedido_compra";

@Table({ tableName: "opcoes" })
export default class Opcoes extends SequelizeModel<Opcoes> {
  @AllowNull(false)
  @Column
  nome: string;

  @ForeignKey(() => GrupoOpcoes)
  @Column({ field: "fk_grupo_opcoes_id", type: DataType.NUMBER })
  grupoOpcoesId: number;

  @ForeignKey(() => Empresa)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @BelongsTo(() => GrupoOpcoes)
  grupoOpcao: GrupoOpcoes;

  @BelongsTo(() => Empresa)
  empresa: Empresa;

  @HasMany(() => Endereco)
  enderecos: Endereco[];

  @HasMany(() => PrePedido)
  prePedidos: PrePedido[];

  @HasMany(() => PedidoCompra)
  pedidosCompra: PedidoCompra[];
}