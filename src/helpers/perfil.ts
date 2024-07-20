import Controller from "@controllers/controller";
import Perfil from "@models/perfil";
import { Transaction } from "sequelize";

class HelperPerfil extends Controller {

  async inserePerfil(perfil: Perfil, transaction?: Transaction): Promise<Perfil> {
    return await perfil.save({ transaction });
  }
}

export default HelperPerfil;