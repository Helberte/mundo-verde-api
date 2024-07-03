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

}

export default HelperEstado;