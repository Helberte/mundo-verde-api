import SequelizeModel from "@core/database/sequelize_model";
import { Table, Column, AllowNull, HasMany, DataType } from "sequelize-typescript";
import Cidade from "./cidade";
import Endereco from "./endereco";

@Table({ tableName: "estado", updatedAt: false })
export default class Estado extends SequelizeModel<Estado> {

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  uf: string;

  @AllowNull(false)
  @Column({ field: "ibge_id", type: DataType.NUMBER })
  ibgeId: number;

  @HasMany(() => Cidade)
  cidades: Cidade[];

  @HasMany(() => Endereco)
  enderecos: Endereco[];
}