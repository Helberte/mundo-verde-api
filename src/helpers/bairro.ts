import Controller from "@controllers/controller";
import Bairro from "@models/bairro";

class HelperBairro extends Controller {

  async insereBairro(bairro: Bairro): Promise<Bairro> {
    return await bairro.save();;
  }
}

export default HelperBairro;