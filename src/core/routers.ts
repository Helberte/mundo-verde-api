import { Router } from "express";
import estado from "@controllers/endereco/estado/routers";
import cidade from "@controllers/endereco/cidade/routers";
import bairro from "@controllers/endereco/bairro/routers";
import grupoEmpresa from "@controllers/empresa/grupo_empresa/routers";
import empresas from "@controllers/empresa/empresa/routers";
import pessoa from "@controllers/recursos_humanos/pessoa/routers";
import usuario from "@controle_acesso/usuario/routers";
import menu from "@controle_acesso/menu/routers";
import perfil from "@controle_acesso/perfil/routers";

const router = Router();

//#region Endereço

router.use("/endereco", estado);
router.use("/endereco", cidade);
router.use("/endereco", bairro);

//#endregion

//#region Empresas

router.use("/empresas", grupoEmpresa);
router.use("/empresas", empresas);

//#endregion

//#region Recursos Humanos

router.use("/pessoa", pessoa)

//#endregion

//#region Controle Acesso

router.use("/usuarios", usuario);
router.use("/menus", menu);
router.use("/perfis", perfil);

//#endregion

export default router;