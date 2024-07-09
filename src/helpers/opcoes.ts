import Controller from "@controllers/controller";
import Opcoes from "@models/opcao";
import GrupoOpcoes from "@models/grupo_opcoes";

export enum EnumGruposOpcoes {
  TiposEndereco = 1,
  SexoPessoas   = 2
}

class HelperOpcoes extends Controller {

  async obtemOpcao(grupoOpcao: EnumGruposOpcoes, opcao: number): Promise<string> {

    const opcaoDescricao: Opcoes = await Opcoes.findOne({
      include: {
        model: GrupoOpcoes,
        attributes: ["id"],
        required: true,
        where: {
          id: Number(grupoOpcao)
        }
      },
      where: {
        id: opcao
      }
    });

    return opcaoDescricao?.nome;
  }
}

export default HelperOpcoes;