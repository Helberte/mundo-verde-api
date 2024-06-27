import { Router } from "express";
import autenticacao from "@controle_acesso/routers";
import endereco from "@controllers/endereco/estado/routers";

const router = Router();

router.use("/login", autenticacao)
router.use("/endereco", endereco);


export default router;