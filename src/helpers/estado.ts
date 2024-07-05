import Controller from "@controllers/controller";
import Estado from "@models/estado";

class HelperEstado extends Controller {

  async insereEstado(estado: Estado): Promise<Estado> {
    return await estado.save();;
  }

  async atualizarEstado(estado: Estado): Promise<void> {
    const linhasAfetadas: number[] = await Estado.update(
      {
        nome: estado.nome,
        uf: estado.uf
      }, {
      where: {
        id: estado.id,
        ibgeId: estado.ibgeId
      }
    });

    if (linhasAfetadas[0] < 1)
      throw new Error("Nenhum registro foi atualizado.");
  }

  async obtemEstado(ibgeId?: number, id?: number): Promise<Estado> {
    let where: any = {};

    if (!ibgeId && !id)
      throw new Error("Forneça o ibgeId ou o Id do cadastro do estado no sistema.");

    if (ibgeId)
      where.ibgeId = ibgeId;

    if (id)
      where.id = id;

    const estado: Estado = await Estado.findOne({ where });

    return estado;
  }

}

export default HelperEstado;