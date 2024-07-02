import SequelizeModel from "@core/database/sequelize_model";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import Representante from "./representante";

@Table({ tableName: "controle_representante", updatedAt: false })
export default class ControleRepresentante extends SequelizeModel<ControleRepresentante> {
  @ForeignKey(() => Representante)
  @Column({ field: "fk_representante_id", type: DataType.NUMBER })
  representanteId: number;

  @BelongsTo(() => Representante)
  representante: Representante;

  @ForeignKey(() => Representante)
  @Column({ field: "fk_representante_subordinado_id", type: DataType.NUMBER })
  representanteSubordinadoId: number;

  @BelongsTo(() => Representante)
  representanteSubordinado: Representante;
}