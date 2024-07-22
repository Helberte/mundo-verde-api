import Controller from "@controllers/controller";
import GrupoEmpresa from "@models/grupo_empresa";
import { deleteCamposDefault } from "./utils";

class HelperGrupoEmpresa extends Controller {

  async insereGrupoEmpresa(grupoEmpresa: GrupoEmpresa): Promise<GrupoEmpresa> {
    return await grupoEmpresa.save();
  }

  async excluiGrupoEmpresa(grupoEmpresa: GrupoEmpresa): Promise<void> {

    const linhasAfetadas: number[] = await GrupoEmpresa.update({
      ...deleteCamposDefault()
    }, {
      where: {
        id: grupoEmpresa.id,
        codigo: grupoEmpresa.codigo
      }
    });

    if (linhasAfetadas[0] < 1)
      throw new Error("Nenhum grupo de empresas foi excluído.")
  }
}

export default HelperGrupoEmpresa;