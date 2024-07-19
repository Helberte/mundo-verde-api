import Controller from "@controllers/controller";
import Menu from "@models/menu";
import { Transaction } from "sequelize";

class HelperMenu extends Controller {

  async insereMenu(menu: Menu, transaction?: Transaction): Promise<Menu> {
    return await menu.save({ transaction });
  }
}

export default HelperMenu;