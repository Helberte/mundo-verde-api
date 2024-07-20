import { Request, Response } from "express";
import { PerfilValidator } from "./validacao_dados";
import { validaParametros } from "@helpers/utils";
import ControleAcessoController from "@controle_acesso/controle_acesso_controller";
import Perfil from "@models/perfil";
import HelperPerfil from "@helpers/perfil";

export default class PerfilController extends ControleAcessoController {

  public async criarPerfil(req: Request, res: Response): Promise<Response> {
    try {
      const perfil: PerfilValidator = await validaParametros<PerfilValidator, any>(PerfilValidator, req.body);

      const perfilExistente: Perfil = await this.obtemPerfil(perfil.empresaId, undefined, perfil.nome.toUpperCase().trim());

      if (perfilExistente)
        throw new Error("Já existe um Perfil nesta empresa com o mesmo nome.");

      const novoPerfil: Perfil = new Perfil({
        nome:      perfil.nome.trim().toUpperCase(),
        empresaId: perfil.empresaId
      });

      const perfilCadastrado: Perfil = await new HelperPerfil().inserePerfil(novoPerfil);

      return res.status(200).json({
        mensagem: "Novo perfil criado com sucesso!",
        perfil: perfilCadastrado
      });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  

/*
  public async consultaPerfis(req: Request, res: Response): Promise<Response> {
    try {
      const menu: MenuValidatorFind = await validaParametros<MenuValidatorFind, any>(MenuValidatorFind, req.query);

      const menuFind: Menu = new Menu({
        id:         menu.id ? Number(menu.id) : undefined,
        nome:       menu.nome,
        descricao:  menu.descricao,
        pai:        menu.pai ? Number(menu.pai) : undefined,
        ordem:      menu.ordem ? Number(menu.ordem) : undefined
      });

      const menus: Menu[] = await this.listaMenus(menuFind);

      return res.status(200).json({ menus });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
*/
}