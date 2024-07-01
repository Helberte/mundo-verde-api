import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column, HasMany, Table } from "sequelize-typescript";
import Empresa from "./empresa";

@Table({
  tableName: "grupo_empresa",
  paranoid: true,
  timestamps: true
})
export default class GrupoEmpresa extends SequelizeModel<GrupoEmpresa> {
  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  codigo: string;

  @HasMany(() => Empresa)
  empresas: Empresa[];
}