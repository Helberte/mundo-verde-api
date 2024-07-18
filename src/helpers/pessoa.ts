import Controller from "@controllers/controller";
import Empresa from "@models/empresa";
import Pessoa from "@models/pessoa";
import { Transaction } from "sequelize";

class HelperPessoa extends Controller {

  async inserePessoa(pessoa: Pessoa, transaction?: Transaction): Promise<Pessoa> {
    return await pessoa.save({ transaction });
  }

  //#region Empresa Pessoa

  async verificaPessoaEmpresa(empresaId: number, pessoaId?: number, cpf?: string, transaction?: Transaction): Promise<boolean> {

    const where: any = { };

    // -------------------------------------------------------------------------------------------------

    if (!pessoaId && !cpf)
      throw new Error("É preciso informar o Id da pessoa ou o CPF.");

    if (!empresaId)
      throw new Error("É preciso informar o Id da Empresa para que se possa consultar.");

    // -------------------------------------------------------------------------------------------------

    if (pessoaId)
      where.id = pessoaId;

    if (cpf)
      where.cpf = cpf;

    const empresaPessoa: Pessoa = await Pessoa.findOne({
      attributes: ["id", "nome", "cpf"],
      where,
      include: {
        attributes: ["id", "nome_fantasia"],
        model: Empresa,
        required: true,
        where: {
          id: empresaId
        },
      },
      transaction
    })

    if (empresaPessoa) return true;

    return false;
  }

  //#endregion
}

export default HelperPessoa;