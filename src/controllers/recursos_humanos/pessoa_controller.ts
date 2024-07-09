import Controller from "@controllers/controller"
import HelperEmpresa from "@helpers/empresa";
import { limpaFormatacaoNumeros } from "@helpers/utils";
import Empresa from "@models/empresa";
import EmpresaPessoa from "@models/empresa_pessoa";
import Pessoa from "@models/pessoa";
import { Transaction } from "sequelize";

class RecursosHumanosController extends Controller {

  //#region Pessoa

  async obtemPessoa(cpf?: string, id?: number, transaction?: Transaction): Promise<Pessoa> {
    const where: any = { }

    if (cpf) {
      cpf = limpaFormatacaoNumeros(cpf);

      if (cpf.length != 11)
        throw new Error("Informe um CPF válido.");

      where.cpf = cpf;
    }

    if (id)
      where.id = id;

    const pessoa: Pessoa = await Pessoa.findOne({ where, transaction });

    return pessoa;
  }

  async inserePessoaEmpresa(empresaId: number, pessoaId: number, transaction?: Transaction): Promise<void> {

    // valida a empresa
    // --------------------------------------------------------------------------------------------------------------
    const empresa: Empresa = await new HelperEmpresa().obtemEmpresa(undefined, empresaId, transaction);

    if (!empresa)
      throw new Error("Empresa informada não está cadastrada ou foi deletada! ID: " + empresaId);

    // valida a pessoa
    // --------------------------------------------------------------------------------------------------------------
    const pessoa: Pessoa = await this.obtemPessoa(undefined, pessoaId, transaction);

    if (!pessoa)
      throw new Error("Pessoa informada não existe ou foi deletada. ID: " + pessoaId);

    // Verifica se a pessoa já foi inserida nesta empresa
    // --------------------------------------------------------------------------------------------------------------
    const empresaPessoaExistente: EmpresaPessoa = await EmpresaPessoa.findOne({
      where: {
        pessoaId,
        empresaId
      },
      transaction
    });

    if (empresaPessoaExistente)
      throw new Error("Esta pessoa já está cadastrada nesta empresa. ID Pessoa: " + pessoaId + ", ID Empresa: " + empresaId);

    // --------------------------------------------------------------------------------------------------------------
    //                                          insere a pessoa na empresa
    // --------------------------------------------------------------------------------------------------------------

    const empresaPessoa: EmpresaPessoa = new EmpresaPessoa();

    empresaPessoa.empresaId = empresaId;
    empresaPessoa.pessoaId  = pessoaId;

    await empresaPessoa.save({ transaction });

    // --------------------------------------------------------------------------------------------------------------
  }

  //#endregion

}

export default RecursosHumanosController;