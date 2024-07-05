import Controller from "@controllers/controller";
import Bairro from "@models/bairro";
import { Op } from "sequelize";

class HelperBairro extends Controller {

  async insereBairro(bairro: Bairro): Promise<Bairro> {
    return await bairro.save();;
  }

  async obtemBairro(id?: number, nome?: string, cidadeId?: number): Promise<Bairro> {
    let find: any = {};
    let findLike: any = { };

    if (!id && !nome && !cidadeId)
      throw new Error("Nenhum parametro para buscar o bairro foi encontrado, forneça ao menos um destes parametros: id, nome, cidadeId.")

    if (id)
      find.id = id;

    if (cidadeId)
      find.cidadeId = cidadeId;

    if (nome)
      findLike.nome = nome;

    const bairro: Bairro = await Bairro.findOne({
      where: {
        ...find,
        nome: {
          [Op.substring]: findLike.nome ? findLike.nome : ""
        }
      }
    });

    return bairro;
  }
}

export default HelperBairro;