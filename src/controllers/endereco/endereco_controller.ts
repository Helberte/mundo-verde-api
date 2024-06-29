import Controller from "@controllers/controller"
import Cidade from "@models/cidade";
import Estado from "@models/estado";
import { Op } from "sequelize";

class EnderecoController extends Controller {

  //#region Estado

  public async obtemEstado(ibgeId?: number, id?: number): Promise<Estado> {
    let where: any = {};

    if (!ibgeId && !id)
      throw new Error("Forneça o ibgeId ou o Id do cadastro do estado no sistema.");

    if (ibgeId && id) {
      where = {
        ibgeId,
        id
      }
    } else if (ibgeId) {
      where = {
        ibgeId
      }
    } else if (id) {
      where = {
        id
      }
    }

    const estado: Estado = await Estado.findOne({ where });

    return estado;
  }

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

  public async obtemCidade(ibgeId: number, id?: number): Promise<Cidade> {
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

    const cidade: Cidade = await Cidade.findOne({ where });

    return cidade;
  }

  //#endregion

}

export default EnderecoController;