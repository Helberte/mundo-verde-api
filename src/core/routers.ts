import { Router } from "express";
import autenticacao from "@controle_acesso/routers";
import estado from "@controllers/endereco/estado/routers";
import cidade from "@controllers/endereco/cidade/routers";

const router = Router();

router.use("/login", autenticacao)

//#region Endereço

router.use("/endereco", estado);
router.use("/endereco", cidade);

//#endregion

export default router;