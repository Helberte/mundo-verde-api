import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, Column } from "sequelize-typescript";

export default class Menu extends SequelizeModel<Menu> {

  @AllowNull(false)
  @Column
  nome: string

  @AllowNull(false)
  @Column
  descricao: string

  @AllowNull(false)
  @Column
  pai: number

  @AllowNull(false)
  @Column
  ordem: number
}