import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { EmpresaValidator } from "./validacao_dados";
import EmpresaController from "../empresa_controller";
import Empresa from "@models/empresa";
// import GrupoEmpresa from "@models/grupo_empresa";
// import HelperGrupoEmpresa from "@helpers/grupoEmpresa";
// import Empresa from "@models/empresa";

export default class EmpresasController extends EmpresaController {

  public async criarEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const empresa: EmpresaValidator = await validaParametros<EmpresaValidator, any>(EmpresaValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      const empresaExistente: Empresa = await this.obtemEmpresa(empresa.cnpj.trim());

      if (empresaExistente)
        throw new Error(`Já existe uma empresa com o mesmo CNPJ: ${empresa.cnpj}`);

      // // insere o grupo
      // const novoGrupo: GrupoEmpresa = new GrupoEmpresa();

      // novoGrupo.nome      = grupoEmpresa.nome;
      // novoGrupo.codigo    = grupoEmpresa.codigo;

      // const retorno: GrupoEmpresa = await (new HelperGrupoEmpresa()).insereGrupoEmpresa(novoGrupo);

      // // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "CNPJ aprovado!"
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
  /*
  public async buscaEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const grupoEmpresa: GrupoEmpresaValidatorFind = await validaParametros<GrupoEmpresaValidatorFind, any>(GrupoEmpresaValidatorFind, req.query);

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