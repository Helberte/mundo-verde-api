import Controller from "@controllers/controller"
import Estado from "@models/estado";

class EnderecoController extends Controller {

  //#region Estado

  public async obtemEstado(ibgeId: number, id?: number): Promise<Estado> {    
    let where: any = {};

    if (ibgeId && id) {
      where = { 
        ibgeId,
        id
      }
    } else if (ibgeId) {
      where = { 
        ibgeId
      }
    }      

    const estado: Estado = await Estado.findOne({ where });

    return estado;
  }

  //#endregion
}

export default EnderecoController;