import server from "@config/server";
import { Sequelize } from "sequelize-typescript";

export abstract class Controller {

  protected excludeBase: string[] = [ "createdAt", "updatedAt", "deletedAt", "createdBy", "updatedBy", "deletedBy" ];

  protected db (): Sequelize {
    return server.database.connection();
  }
}

export default Controller;
