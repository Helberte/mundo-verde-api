import { limpaFormatacaoCEP, limpaFormatacaoCNPJ, retornaDiferencaObjetos, validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { EmpresaValidator, EmpresaValidatorFind, EmpresaValidatorUpdate, EnderecoEmpresaValidator } from "./validacao_dados";
import EmpresaController from "../empresa_controller";
import Empresa from "@models/empresa";
import HelperEmpresa from "@helpers/empresa";
import GrupoEmpresa from "@models/grupo_empresa";
import Endereco from "@models/endereco";
import HelperOpcoes, { EnumGruposOpcoes } from "@helpers/opcoes";
import Estado from "@models/estado";
import HelperEstado from "@helpers/estado";
import Cidade from "@models/cidade";
import HelperCidade from "@helpers/cidade";
import Bairro from "@models/bairro";
import HelperBairro from "@helpers/bairro";
import { Transaction } from "sequelize";
import EmpresaEndereco from "@models/empresa_endereco";

export default class EmpresasController extends EmpresaController {

  public async criarEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const empresa: EmpresaValidator = await validaParametros<EmpresaValidator, any>(EmpresaValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      let empresaExistente: Empresa = await this.obtemEmpresa(empresa.cnpj.trim());

      if (empresaExistente)
        throw new Error(`Já existe uma empresa com o mesmo CNPJ: ${empresa.cnpj}`);

      empresaExistente = await this.obtemEmpresaPorNome(empresa.razaoSocial, empresa.nomeFantasia) as Empresa;

      if (empresaExistente)
        throw new Error(`Já existe empresa com o mesmo nome fantasia/razão social`);

      // ------------------------------------------------------------------------------------------------------

      const grupoEmpresa: GrupoEmpresa = await this.obtemGrupoEmpresa(empresa.grupoEmpresaId);

      if (!grupoEmpresa)
        throw new Error("Este grupo de empresa informado não existe!");

      // ------------------------------------------------------------------------------------------------------

      // insere a empresa
      const novaEmpresa: Empresa = new Empresa();

      novaEmpresa.razaoSocial    = empresa.razaoSocial.trim();
      novaEmpresa.nomeFantasia   = empresa.nomeFantasia.trim();
      novaEmpresa.cnpj           = empresa.cnpj;
      novaEmpresa.filial         = empresa.filial.trim();
      novaEmpresa.grupoEmpresaId = empresa.grupoEmpresaId;

      const retorno: Empresa = await (new HelperEmpresa()).insereEmpresa(novaEmpresa);

      // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Empresa adicionada com sucesso!",
        empresa: retorno
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async buscaEmpresas(req: Request, res: Response): Promise<Response> {
    try {
      const empresa: EmpresaValidatorFind = await validaParametros<EmpresaValidatorFind, any>(EmpresaValidatorFind, req.query);

      // só irá conseguir buscar as empresas que o usuário tiver acesso
      const empresaFind: Empresa = new Empresa();

      empresaFind.id             = Number(empresa.id);
      empresaFind.razaoSocial    = empresa.razaoSocial?.trim();
      empresaFind.nomeFantasia   = empresa.nomeFantasia?.trim();
      empresaFind.cnpj           = empresa.cnpj;
      empresaFind.filial         = empresa.filial?.trim();
      empresaFind.grupoEmpresaId = Number(empresa.grupoEmpresaId);

      const empresas: Empresa[] = await this.listaEmpresas(empresaFind);

      return res.status(200).json({ empresas });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async atualizaEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const empresa: EmpresaValidatorUpdate = await validaParametros<EmpresaValidatorUpdate, any>(EmpresaValidatorUpdate, req.body);
      const values: any = { };

      // ------------------------------------------------------------------------------------------------------

      // verifica se a empresa existe
      let empresaExistente: Empresa = await this.obtemEmpresa(undefined, empresa.id);

      if (!empresaExistente)
        throw new Error(`Esta empresa ainda não existe cadastrada na nossa base de dados. CNPJ: ${empresa.cnpj}`);

      // ------------------------------------------------------------------------------------------------------

      // verifica se existe outra empresa com o mesmo cnpj
      let empresaDuplicada: Empresa = await this.obtemEmpresa(empresa.cnpj.trim());

      if (empresaDuplicada && empresaDuplicada.id != empresa.id)
        throw new Error(`Já existe uma empresa com o mesmo CNPJ: ${empresa.cnpj}`);

      // ------------------------------------------------------------------------------------------------------

      // verifica se tem outras empresas com o mesmo nome já cadastrada
      const empresasMesmoNome: Empresa[] = await this.obtemEmpresaPorNome(empresa.razaoSocial, empresa.nomeFantasia, true) as Empresa[];

      if (empresasMesmoNome.length > 0) {
        for (const empresaItem of empresasMesmoNome) {

          if ((empresaItem.razaoSocial.trim().toUpperCase().replace(" ", "") == empresa.razaoSocial.trim().toUpperCase().replace(" ", "")) && empresaItem.id != empresa.id) {
            throw new Error(`Já existe empresa com a mesma Razão social`);
          }
          else if ((empresaItem.nomeFantasia.trim().toUpperCase().replace(" ", "") == empresa.nomeFantasia.trim().toUpperCase().replace(" ", "")) && empresaItem.id != empresa.id) {
            throw new Error(`Já existe empresa com o mesmo Nome Fantasia`);
          }
        }
      }

      // ------------------------------------------------------------------------------------------------------

      const grupoEmpresa: GrupoEmpresa = await this.obtemGrupoEmpresa(empresa.grupoEmpresaId);

      if (!grupoEmpresa)
        throw new Error("Este grupo de empresa informado não existe!");

      // ------------------------------------------------------------------------------------------------------

      // Atualiza a empresa
      if (empresa.razaoSocial.trim() != empresaExistente.razaoSocial.trim())
        values.razaoSocial = empresa.razaoSocial.trim();

      if (empresa.nomeFantasia.trim() != empresaExistente.nomeFantasia.trim())
        values.nomeFantasia = empresa.nomeFantasia.trim();

      if (limpaFormatacaoCNPJ(empresa.cnpj) != limpaFormatacaoCNPJ(empresaExistente.cnpj))
        values.cnpj = limpaFormatacaoCNPJ(empresa.cnpj);

      if (empresa.filial.trim() != empresaExistente.filial)
        values.filial = empresa.filial.trim();

      if (empresa.grupoEmpresaId != empresaExistente.grupoEmpresaId)
        values.grupoEmpresaId = empresa.grupoEmpresaId;

      await (new HelperEmpresa()).atualizarEmpresa(empresa.id, values);

      // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Empresa Atualizada com sucesso!"
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  /**
  * @description Só será permitido adicionar endereço a empresa que o usuário estiver logado ou se, a empresa
  * que está tentando atualizar o endereço ou adicionar endereço for diferente da empresa cujo usuário estiver
  * logado, só será pertitido isso, caso o usuário tenha acesso a esta empresa
  *
  * resumo:
  *
  * if (empresa == empresa usuário logado?)
  *   atualiza ou insere de boa o endereço
  * else
  * {
  *   if (verifica se o usuário tem acesso àquela empresa)
  *     atualiza ou insere de boa o endereço
  *   else
  *     sai fora!
  * }
  *
  * @memberof EmpresasController
  *
  * @data 08/07/2024
  *
  * @author Helberte Costa
  *
  * @param req Request
  * @param res Response
  *
  * @returns Response
  */
  public async adicionaEnderecoEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const dados: EnderecoEmpresaValidator = await validaParametros<EnderecoEmpresaValidator, any>(EnderecoEmpresaValidator, req.body);
      let enderecoRetornar:   EmpresaEndereco;
      let objetoUpdate:       any     = { };
      let enderecoAtualizado: boolean = false;
      let mensagem:           string  = "";

      // verificar se a empresa existe
      let empresaExistente: Empresa = await this.obtemEmpresa(undefined, dados.empresaId);

      if (!empresaExistente)
        throw new Error(`A empresa informada, não existe cadastrada. ID: ${dados.empresaId}`);

      // verificar se a empresa possui endereco
      const enderecoEmpresa: Endereco = await this.buscaEnderecoEmpresa(dados.empresaId) as Endereco;

      // se possuir endereço, e não tiver liberado, retornar que precisa de liberação para atualizar o endereço existente
      if (!dados.liberacao && enderecoEmpresa)
        throw new Error("Esta empresa já possui endereço, para atualizar será necessário uma liberação. <br>" +
          "<br>Deseja Continuar?");

      // opcoes
      // ------------------------------------------------------------------------------------------------------

      const tipoEndereco: string = await new HelperOpcoes().obtemOpcao(EnumGruposOpcoes.TiposEndereco, dados.opcoesTipoId);

      if (!tipoEndereco)
        throw new Error("O Tipo do endereço informado está cadastrado!");

      // estado
      // ------------------------------------------------------------------------------------------------------

      const estado: Estado = await new HelperEstado().obtemEstado(undefined, dados.estadoId);

      if (!estado)
        throw new Error("O Estado informado não está cadastrado!");

      // cidade
      // ------------------------------------------------------------------------------------------------------

      const cidade: Cidade = await new HelperCidade().obtemCidade(undefined, dados.cidadeId);

      if (!cidade)
        throw new Error("A Cidade informada não está cadastrada!");

      // bairro
      // ------------------------------------------------------------------------------------------------------

      const bairro: Bairro = await new HelperBairro().obtemBairro(dados.bairroId, undefined, cidade.id);

      if (!bairro)
        throw new Error("O Bairro informado não existe cadastrado ou não pertence a esta cidade!");

      // ------------------------------------------------------------------------------------------------------

      const endereco: Endereco = new Endereco();

      endereco.rua          = dados.rua.trim();
      endereco.numero       = dados.numero?.trim();
      endereco.observacao   = dados.observacao?.trim();
      endereco.complemento  = dados.complemento?.trim();
      endereco.cep          = limpaFormatacaoCEP(dados.cep);
      endereco.opcoesTipoId = dados.opcoesTipoId;
      endereco.bairroId     = dados.bairroId;
      endereco.cidadeId     = dados.cidadeId;
      endereco.estadoId     = dados.estadoId;

      // se o endereço já existe, tenta atualizar somente as propriedades alteradas
      if (enderecoEmpresa) {
        objetoUpdate = retornaDiferencaObjetos(enderecoEmpresa.dataValues, endereco.dataValues)

        if (Object.keys(objetoUpdate).length > 0) {
          await this.db().transaction(async (transaction: Transaction)=> {
              enderecoAtualizado = await this.atualizaEnderecoEmpresa(enderecoEmpresa, objetoUpdate, transaction);
          });
        }
      } else {
        await this.db().transaction(async (transaction: Transaction)=> {
          await this.insereEnderecoEmpresa(endereco, dados.empresaId, transaction);
        });
      }

      // ------------------------------------------------------------------------------------------------------
      // define a mensagem a ser retornada ao usuário

      mensagem = "Endereço inserido com sucesso!";

      if (enderecoEmpresa && Object.keys(objetoUpdate).length > 0) {
        mensagem = "Endereço atualizado com sucesso!";
      } else if (enderecoEmpresa && Object.keys(objetoUpdate).length <= 0) {
        mensagem = "Nenhuma informação foi atualizada!";
      }

      // ------------------------------------------------------------------------------------------------------

      enderecoRetornar = await this.buscaEnderecoEmpresa(dados.empresaId, true) as EmpresaEndereco;

      return res.status(200).json({
        mensagem,
        enderecoAtualizado,
        empresaEndereco: { ...enderecoRetornar.dataValues }
      });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  // public async obtemEnderecoEmpresa(req: Request, res: Response): Promise<Response> {

  // }
}