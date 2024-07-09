import Controller from "@controllers/controller";
import Pessoa from "@models/pessoa";
import { Transaction } from "sequelize";

class HelperPessoa extends Controller {

  async inserePessoa(pessoa: Pessoa, transaction?: Transaction): Promise<Pessoa> {
    return await pessoa.save({ transaction });
  }
}

export default HelperPessoa;