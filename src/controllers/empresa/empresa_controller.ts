import Controller from "@controllers/controller"
import Empresa from "@models/empresa";
import GrupoEmpresa from "@models/grupo_empresa";
import { Op } from "sequelize";

class EmpresaController extends Controller {

  //#region Grupo Empresa

  public async obtemGrupoEmpresa(id: number, codigo?: string): Promise<GrupoEmpresa> {
    const where: any = { id };

    if (codigo)
      where.codigo = codigo;

    const grupoEmpresa: GrupoEmpresa = await GrupoEmpresa.findOne({ where });

    return grupoEmpresa;
  }

  public async listaGruposEmpresas(grupoEmpresa?: GrupoEmpresa, limit: number = 50): Promise<GrupoEmpresa[]> {
    let find:     any = { };
    let findLike: any = { };

    if (grupoEmpresa?.id)
      find.id = grupoEmpresa.id;

    if (grupoEmpresa?.codigo)
      find.codigo = grupoEmpresa.codigo;

    if (grupoEmpresa?.nome)
      findLike.nome = grupoEmpresa.nome;

    return await GrupoEmpresa.findAll({
      attributes: ["createdAt"],
      where: {
        ...find,
        nome: {
          [Op.substring]: findLike.nome ? findLike.nome : ""
        }
      },
      order: [
        ["codigo", "ASC"]
      ],
      limit
    });
  }

  public async obtemEmpresasComGrupoEmpresa(idGrupo: number, codigo: string): Promise<Empresa[]> {

    const empresas: Empresa[] = await Empresa.findAll({
      attributes: ["id", "razao_social", "nome_fantasia", "cnpj"],
      include: {
        attributes: ["id"],
        model: GrupoEmpresa,
        required: true,
        where: {
          codigo,
          id: idGrupo
        }
      }
    });

    return empresas;
  }

  //#endregion
}

export default EmpresaController;