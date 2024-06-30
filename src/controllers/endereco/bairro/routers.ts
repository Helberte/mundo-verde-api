import { Router, Request, Response } from "express";
import Bairro from "./bairro";

const router: Router = Router();

router.post("/bairro", async (req: Request, res: Response) => {
  await (new Bairro()).criarBairro(req, res);
});

router.get("/bairro", async (req: Request, res: Response) => {
  await (new Bairro()).buscaBairro(req, res);
});

export default router;