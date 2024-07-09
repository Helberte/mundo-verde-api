import Controller from "@controllers/controller";
import Empresa from "@models/empresa";
import { limpaFormatacaoNumeros } from "./utils";
import { Transaction } from "sequelize";

class HelperEmpresa extends Controller {

  async obtemEmpresa(cnpj?: string, id?: number, transaction?: Transaction): Promise<Empresa> {
    const where: any = { };

    if (!cnpj && !id)
      throw new Error("Para buscar uma empresa é preciso informar ou o ID ou o CNPJ da mesma.");

    if (cnpj)
      where.cnpj = limpaFormatacaoNumeros(cnpj);

    if (id)
      where.id = id;

    const empresa: Empresa = await Empresa.findOne({
      where,
      transaction
    })

    return empresa;
  }

  async insereEmpresa(empresa: Empresa): Promise<Empresa> {
    return await empresa.save();;
  }

  async atualizarEmpresa(id: number, values: any): Promise<void> {
    const linhasAfetadas: number[] = await Empresa.update(values, {
      where: {
        id
      }
    });

    if (linhasAfetadas[0] < 1)
      throw new Error("Nenhum registro de Empresa foi atualizado.");
  }
}

export default HelperEmpresa;