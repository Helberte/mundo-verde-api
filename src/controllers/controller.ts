import server from "@config/server";
import { Sequelize } from "sequelize";

export abstract class Controller {

  protected db (): Sequelize {
    return server.database.connection();
  }
}

export default Controller;
