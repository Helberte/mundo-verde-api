import Controller from "@controllers/controller"
import { limpaFormatacaoNumeros } from "@helpers/utils";
import Bairro from "@models/bairro";
import Cidade from "@models/cidade";
import Empresa from "@models/empresa";
import EmpresaEndereco from "@models/empresa_endereco";
import Endereco from "@models/endereco";
import Estado from "@models/estado";
import GrupoEmpresa from "@models/grupo_empresa";
import { GruposDeOpcoes } from "@models/grupo_opcoes";
import Opcoes from "@models/opcao";
import moment from "moment";
import { FindOptions, Op, Transaction } from "sequelize";

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
      where.cnpj = limpaFormatacaoNumeros(cnpj);

    if (id)
      where.id = id;

    const empresa: Empresa = await Empresa.findOne({
      where
    })

    return empresa;
  }

  async obtemEmpresaPorNome(razaoSocial: string = "", nomeFantasia: string = "", retornaTodas: boolean = false): Promise<Empresa | Empresa[] | undefined> {

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

    if (!retornaTodas) {
      let empresa: Empresa = empresas.find(x => x.razaoSocial.replace(" ", "").toUpperCase() === razaoSocial.replace(" ", "").toUpperCase().trim());

      if (empresa)
        return empresa;

      empresa = empresas.find(x => x.nomeFantasia.replace(" ", "").toUpperCase() === nomeFantasia.replace(" ", "").toUpperCase().trim());

      return empresa ? empresa : undefined;
    }

    return empresas;
  }

  async listaEmpresas(empresa: Empresa, limit: number = 50): Promise<Empresa[]> {
    let find:     any = { };
    let findLike: any = { };

    if (empresa.id)
      find.id = empresa.id;

    if (empresa.filial)
      find.filial = empresa.filial;

    if (empresa.grupoEmpresaId)
      find.grupoEmpresaId = empresa.grupoEmpresaId;

    if (empresa.razaoSocial)
      findLike.razaoSocial = empresa.razaoSocial;

    if (empresa.nomeFantasia)
      findLike.nomeFantasia = empresa.nomeFantasia;

    if (empresa.cnpj)
      findLike.cnpj = empresa.cnpj;

    return await Empresa.findAll({
      where: {
        ...find,
        razaoSocial: {
          [Op.substring]: findLike.razaoSocial ? findLike.razaoSocial : ""
        },
        nomeFantasia: {
          [Op.substring]: findLike.nomeFantasia ? findLike.nomeFantasia : ""
        },
        cnpj: {
          [Op.substring]: findLike.cnpj ? limpaFormatacaoNumeros(findLike.cnpj) : ""
        }
      },
      order: [
        ["razaoSocial", "ASC"]
      ],
      limit
    });
  }

  async buscaEnderecoEmpresa(empresaId: number, enderecoCompleto: boolean = false): Promise<Endereco | EmpresaEndereco> {
    let empresaEndereco: EmpresaEndereco;
    let endereco:        Endereco;

    if (!enderecoCompleto) {
      endereco = (await EmpresaEndereco.findOne(
        {
          attributes: ["id"],
          include: [
            {
              model: Endereco,
              required: true
            },
            {
              model: Empresa,
              required: true,
              attributes: ["id", "cnpj", "filial"],
              where: {
                id: empresaId
              }
            }
          ]
        }
      ))?.endereco;

    } else {
      empresaEndereco = await EmpresaEndereco.findOne(
        {
          attributes: {
            exclude: [ ...this.excludeBase, "empresaId", "enderecoId" ]
          },
          include: [
            {
              model: Endereco,
              required: true,
              attributes: {
                exclude: [ ...this.excludeBase, "opcoesTipoId", "bairroId", "cidadeId", "estadoId" ]
              },
              include: [
                {
                  model: Opcoes,
                  required: true,
                  where: {
                    grupoOpcoesId: GruposDeOpcoes.TiposEndereco
                  }
                },
                {
                  model: Estado,
                  required: true
                },
                {
                  model: Bairro,
                  required: true
                },
                {
                  model: Cidade,
                  required: true
                }
              ]
            },
            {
              model: Empresa,
              required: true,
              where: {
                id: empresaId
              }
            }
          ]
        }
      );
    }

    return endereco ? endereco : empresaEndereco;
  }

  async insereEnderecoEmpresa(endereco: Endereco, empresaId: number, transaction: Transaction): Promise<Endereco> {

    const enderecoInserido: Endereco = await endereco.save({ transaction });

    const empresaEndereco: EmpresaEndereco = new EmpresaEndereco();

    empresaEndereco.empresaId  = empresaId;
    empresaEndereco.enderecoId = enderecoInserido.id;

    await empresaEndereco.save({ transaction });

    return enderecoInserido;
  }

  async atualizaEnderecoEmpresa(endereco: Endereco, objCampos: any, transaction: Transaction): Promise<boolean> {
    if (Object.keys(objCampos).length > 0) {
      objCampos.updatedAt = moment()

      await endereco.update({ ...objCampos }, undefined, { transaction });

      return true;
    }
    return false
  }

  //#endregion
}

export default EmpresaController;