import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import ComposicaoPreco from "./composicao_preco";
import Representante from "./representante";

@Table({ tableName: "tipo_representante", timestamps: false })
export default class TipoRepresentante extends SequelizeModel<TipoRepresentante> {
  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  valor: number;

  @ForeignKey(() => ComposicaoPreco)
  @Column({ field: "fk_composicao_preco_id", type: DataType.NUMBER })
  composicaoPrecoId: string;

  @BelongsTo(() => ComposicaoPreco)
  composicaoPreco: ComposicaoPreco;

  @AllowNull(false)
  @Column({ field: "fk_empresa_id", type: DataType.NUMBER })
  empresaId: number;

  @HasMany(() => Representante)
  representantes: Representante[];
}