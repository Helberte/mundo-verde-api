import { Router } from "express";
import autenticacao from "@controle_acesso/routers";

const router = Router();

router.use("/login", autenticacao)


export default router;