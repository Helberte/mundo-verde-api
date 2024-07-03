import Controller from "@controllers/controller";
import Empresa from "@models/empresa";

class HelperEmpresa extends Controller {

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