import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column } from "sequelize-typescript";

export default class GrupoEmpresa extends SequelizeModel<GrupoEmpresa> {

  @AllowNull(false)
  @Column
  nome: string;

  @AllowNull(false)
  @Column
  codigo: string;
}