import Controller from "@controllers/controller";
import Endereco from "@models/endereco";
import moment from "moment";
import { Transaction } from "sequelize";

class HelperEndereco extends Controller {
  async atualizaEnderecoExistente(endereco: Endereco, objCampos: any, transaction: Transaction): Promise<boolean> {
    if (Object.keys(objCampos).length > 0) {
      objCampos.updatedAt = moment()

      await endereco.update({ ...objCampos }, undefined, { transaction });

      return true;
    }
    return false
  }
}

export default HelperEndereco;