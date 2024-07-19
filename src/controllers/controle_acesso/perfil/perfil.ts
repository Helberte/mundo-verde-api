import { Request, Response } from "express";
import { MenuValidator, MenuValidatorFind } from "./validacao_dados";
import { validaParametros } from "@helpers/utils";
import ControleAcessoController from "@controle_acesso/controle_acesso_controller";
import Menu from "@models/menu";
import HelperMenu from "@helpers/menu";

export default class PerfilController extends ControleAcessoController {

  public async criarPerfil(req: Request, res: Response): Promise<Response> {
    try {
      const menu: MenuValidator = await validaParametros<MenuValidator, any>(MenuValidator, req.body);

      // não existir outro menu com o mesmo nome
      const menuExistente: Menu = await this.obtemMenuNome(menu.nome.trim().toUpperCase());

      if (menuExistente)
        throw new Error("Já existe um menu cadastrado com o mesmo nome.");

      // a ordem e o pai não podem ser numeros negativos
      if (menu.ordem < 0)
        throw new Error("A ordem não pode ser negativa.");

      if (menu.pai && menu.pai < 0)
        throw new Error("O pai não pode ser negativo.");

      // se foi informado um pai, este pai precisa existir
      if (menu.pai) {
        const menuPai: Menu = await this.obtemMenuNome(undefined, menu.pai);

        if (!menuPai)
          throw new Error("O menu pai informado para este menu filho é inexistente. O menu pai precisa estar cadastrado.");

        // não pode ter outro menu que seja do mesmo pai na mesma ordem
        const menusFilho: Menu[] = await this.obtemMenusFilho(menu.pai);

        if (menusFilho.length > 0) {
          const menuOrdem: Menu = menusFilho.find(x => x.ordem == menu.ordem);

          if (menuOrdem)
            throw new Error("Já existe um menu filho deste menu pai informado que possui a mesma ordem, informe uma ordem diferente para continuar.");
        }
      }

      // inserir menu
      const novoMenu: Menu = new Menu({
        nome:      menu.nome.trim().toUpperCase(),
        descricao: menu.descricao.trim().toUpperCase(),
        pai:       menu.pai ? menu.pai : null,
        ordem:     menu.ordem
      });

      const menuCadastrado: Menu = await new HelperMenu().insereMenu(novoMenu);

      return res.status(200).json({
        mensagem: "Novo menu criado com sucesso!",
        menu: menuCadastrado
      });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

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
}