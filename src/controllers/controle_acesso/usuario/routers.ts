import { Router, Request, Response } from "express";
import Usuario from "./usuario";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Usuario()).criarUsuario(req, res);
});

export default router;