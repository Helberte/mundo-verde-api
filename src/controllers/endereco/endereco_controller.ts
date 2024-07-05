import Controller from "@controllers/controller"
import Bairro from "@models/bairro";
import Cidade from "@models/cidade";
import Estado from "@models/estado";
import { Op } from "sequelize";

class EnderecoController extends Controller {

  //#region Estado

  public async listaEstados(estado?: Estado, limit: number = 50): Promise<Estado[]> {
    let find:     any = { };
    let findLike: any = { };

    if (estado?.id)
      find.id = estado.id;

    if (estado?.ibgeId)
      find.ibgeId = estado.ibgeId;

    if (estado?.nome)
      findLike.nome = estado.nome;

    if (estado?.uf)
      findLike.uf = estado.uf;

    return await Estado.findAll({
      where: {
        ...find,
        nome: {
          [Op.substring]: findLike.nome ? findLike.nome : ""
        },
        uf: {
          [Op.substring]: findLike.uf ? findLike.uf : ""
        }
      },
      order: [
        ["nome", "ASC"]
      ],
      limit
    });
  }

  //#endregion

  //#region Cidade

  public async listaCidades(cidade?: Cidade, limit: number = 50): Promise<Cidade[]> {
    let find:     any = { };
    let findLike: any = { };

    if (cidade?.id)
      find.id = cidade.id;

    if (cidade?.ibgeId)
      find.ibgeId = cidade.ibgeId;

    if (cidade?.estadoId)
      find.estadoId = cidade.estadoId;

    if (cidade?.nome)
      findLike.nome = cidade.nome;

    return await Cidade.findAll({
      where: {
        ...find,
        nome: {
          [Op.substring]: findLike.nome ? findLike.nome : ""
        }
      },
      order: [
        ["nome", "ASC"]
      ],
      limit
    });
  }

  //#endregion

  //#region Bairro

  public async listaBairros(bairro?: Bairro, limit: number = 50): Promise<Bairro[]> {
    let find:     any = { };
    let findLike: any = { };

    if (bairro?.id)
      find.id = bairro.id;

    if (bairro?.cidadeId)
      find.cidadeId = bairro.cidadeId;

    if (bairro?.nome)
      findLike.nome = bairro.nome;

    return await Bairro.findAll({
      where: {
        ...find,
        nome: {
          [Op.substring]: findLike.nome ? findLike.nome : ""
        }
      },
      order: [
        ["nome", "ASC"]
      ],
      limit
    });
  }

  //#endregion
}

export default EnderecoController;