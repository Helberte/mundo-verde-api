import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { EmpresaValidator, EmpresaValidatorFind } from "./validacao_dados";
import EmpresaController from "../empresa_controller";
import Empresa from "@models/empresa";
import HelperEmpresa from "@helpers/empresa";
import GrupoEmpresa from "@models/grupo_empresa";
// import GrupoEmpresa from "@models/grupo_empresa";
// import HelperGrupoEmpresa from "@helpers/grupoEmpresa";
// import Empresa from "@models/empresa";

export default class EmpresasController extends EmpresaController {

  public async criarEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const empresa: EmpresaValidator = await validaParametros<EmpresaValidator, any>(EmpresaValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      let empresaExistente: Empresa = await this.obtemEmpresa(empresa.cnpj.trim());

      if (empresaExistente)
        throw new Error(`Já existe uma empresa com o mesmo CNPJ: ${empresa.cnpj}`);

      empresaExistente = await this.obtemEmpresaPorNome(empresa.razaoSocial, empresa.nomeFantasia);

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

  public async buscaEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const grupoEmpresa: EmpresaValidatorFind = await validaParametros<EmpresaValidatorFind, any>(GrupoEmpresaValidatorFind, req.query);

      // só irá conseguir buscar as empresas que o usuário tiver acesso
      const grupoEmpresaFind: GrupoEmpresa = new GrupoEmpresa();

      grupoEmpresaFind.nome   = grupoEmpresa.nome;
      grupoEmpresaFind.id     = Number(grupoEmpresa.id);
      grupoEmpresaFind.codigo = grupoEmpresa.codigo;

      const gruposEmpresas: GrupoEmpresa[] = await this.listaGruposEmpresas(grupoEmpresaFind);

      return res.status(200).json({ gruposEmpresas });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
/*
  public async excluirEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      // por enquanto ainda não tem validação de usuário com o grupo de empresas, mas precisará existir

      const grupoEmpresa: GrupoEmpresaValidatorDelete = await validaParametros<GrupoEmpresaValidatorDelete, any>(GrupoEmpresaValidatorDelete, req.body);

      const grupoExistente: GrupoEmpresa = await this.obtemGrupoEmpresa(grupoEmpresa.id, grupoEmpresa.codigo ? grupoEmpresa.codigo : undefined);

      if (!grupoExistente)
        throw new Error("Grupo de Empresas informado não existe cadastrado na base de dados.");

      const empresas: Empresa[] = await this.obtemEmpresasComGrupoEmpresa(grupoEmpresa.id, grupoEmpresa.codigo);

      if (empresas.length > 0) {
        return res.status(200).json({
          quantidadeEmpresas: empresas.length,
          empresas
         });
      }

      // exclui o grupo empresa
      await (new HelperGrupoEmpresa()).excluiGrupoEmpresa(grupoExistente);

      return res.status(200).json({ mensagem: "Grupo Empresa excluído com sucesso!", quantidadeEmpresas: 0 });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async atualizaEmpresa(req: Request, res: Response): Promise<Response> {

  }
  */
}