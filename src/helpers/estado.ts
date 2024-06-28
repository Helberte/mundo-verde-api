import Controller from "@controllers/controller";
import Estado from "@models/estado";

class HelperEstado extends Controller {

  async insereEstado(estado: Estado): Promise<Estado> {
    return await estado.save();;
  }

}

export default HelperEstado;