import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column } from "sequelize-typescript";

export default class Empresa extends SequelizeModel<Empresa> {

  @AllowNull(false)
  @Column
  razaoSocial: string;

  @Column
  nomeFantasia: string;

  @Column
  cnpj: string;

  @AllowNull(true)
  @Column
  filial: string

  enderecoId: number
}