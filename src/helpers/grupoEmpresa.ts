import Controller from "@controllers/controller";
import GrupoEmpresa from "@models/grupo_empresa";

class HelperGrupoEmpresa extends Controller {

  async insereGrupoEmpresa(grupoEmpresa: GrupoEmpresa): Promise<GrupoEmpresa> {
    return await grupoEmpresa.save();;
  }
}

export default HelperGrupoEmpresa;