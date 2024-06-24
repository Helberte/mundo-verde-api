import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany } from "sequelize-typescript";
import Pessoa from "./pessoa";
import TipoRepresentante from "./tipo_representante";
import PrePedido from "./pre_pedido";

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
}