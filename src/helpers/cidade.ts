import Controller from "@controllers/controller";
import Cidade from "@models/cidade";

class HelperCidade extends Controller {

  async insereCidade(cidade: Cidade): Promise<Cidade> {
    return await cidade.save();;
  }

}

export default HelperCidade;