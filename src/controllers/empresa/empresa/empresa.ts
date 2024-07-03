import { limpaFormatacaoCNPJ, validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { EmpresaValidator, EmpresaValidatorFind, EmpresaValidatorUpdate } from "./validacao_dados";
import EmpresaController from "../empresa_controller";
import Empresa from "@models/empresa";
import HelperEmpresa from "@helpers/empresa";
import GrupoEmpresa from "@models/grupo_empresa";

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

  public async adicionaEnderecoEmpresa(req: Request, res: Response): Promise<Response> {
    try {

      // verificar se a empresa existe

      // verificar se a empresa possui endereco

      // se possuir endereço, e não tiver liberado, retornar que precisa de liberação para atualizar o endereço existente

      // se não possuir endereço => inserir novo endereço e vincula-lo a empresa, caso exista, apenas atualizar

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}