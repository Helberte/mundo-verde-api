import Controller from "@controllers/controller";
import Cidade from "@models/cidade";

class HelperCidade extends Controller {

  async insereCidade(cidade: Cidade): Promise<Cidade> {
    return await cidade.save();;
  }

  async obtemCidade(ibgeId?: number, id?: number): Promise<Cidade> {
    let where: any = {};

    if (!ibgeId && !id)
      throw new Error("Forneça o ibgeId ou o Id do cadastro da cidade no sistema.");

    if (ibgeId)
      where.ibgeId = ibgeId;

    if (id)
      where.id = id;

    const cidade: Cidade = await Cidade.findOne({ where });

    return cidade;
  }

}

export default HelperCidade;