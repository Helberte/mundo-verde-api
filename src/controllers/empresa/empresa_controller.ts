import Controller from "@controllers/controller"
import Empresa from "@models/empresa";
import GrupoEmpresa from "@models/grupo_empresa";
import { FindOptions, Op } from "sequelize";

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

  //#region Empresa

  async obtemEmpresa(cnpj?: string, id?: number): Promise<Empresa> {
    const where: any = { };

    if (!cnpj && !id)
      throw new Error("Para buscar uma empresa é preciso informar ou o ID ou o CNPJ da mesma.");

    if (cnpj)
      where.cnpj = cnpj;

    if (id)
      where.id = id;

    const empresa: Empresa = await Empresa.findOne({
      where
    })

    return empresa;
  }

  async obtemEmpresaPorNome(razaoSocial: string = "", nomeFantasia: string = ""): Promise<Empresa | undefined> {

    const options: FindOptions<Empresa> = { };

    if (!razaoSocial && !nomeFantasia)
      throw new Error("É preciso informar ou a Razão Social ou o Nome Fantasia para buscar empresas por nome.");

    if (razaoSocial && nomeFantasia) {
      options.where = {
        [Op.or]: [
          {
            razaoSocial: {
              [Op.substring]: razaoSocial
            }
          },
          {
            nomeFantasia: {
              [Op.substring]: nomeFantasia
            }
          }
        ]
      }
    }
    else if (razaoSocial) {
      options.where = {
        razaoSocial: {
          [Op.substring]: razaoSocial
        }
      }
    }
    else if (nomeFantasia) {
      options.where = {
        nomeFantasia: {
          [Op.substring]: nomeFantasia
        }
      }
    }

    const empresas: Empresa[] = await Empresa.findAll(options);

    let empresa: Empresa = empresas.find(x => x.razaoSocial.replace(" ", "").toUpperCase() === razaoSocial.replace(" ", "").toUpperCase().trim());

    if (empresa)
      return empresa;

    empresa = empresas.find(x => x.nomeFantasia.replace(" ", "").toUpperCase() === nomeFantasia.replace(" ", "").toUpperCase().trim());

    return empresa ? empresa : undefined;
  }

  //#endregion
}

export default EmpresaController;