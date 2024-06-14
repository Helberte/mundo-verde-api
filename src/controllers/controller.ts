import server from "@core/server";
import { Sequelize } from "sequelize";


export abstract class Controller {

  protected async db (): Promise<Sequelize> {
    return await server.database.connection();
  }
}

export default Controller;
