import { Router } from "express";
import autenticacao from "@controle_acesso/routers";
import estado from "@controllers/endereco/estado/routers";
import cidade from "@controllers/endereco/cidade/routers";
import bairro from "@controllers/endereco/bairro/routers";

const router = Router();

router.use("/login", autenticacao)

//#region Endereço

router.use("/endereco", estado);
router.use("/endereco", cidade);
router.use("/endereco", bairro);

//#endregion

export default router;