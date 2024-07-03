import Controller from "@controllers/controller";
import Empresa from "@models/empresa";

class HelperEmpresa extends Controller {

  async insereEmpresa(empresa: Empresa): Promise<Empresa> {
    return await empresa.save();;
  }

}

export default HelperEmpresa;