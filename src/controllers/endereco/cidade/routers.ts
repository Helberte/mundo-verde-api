import { Router, Request, Response } from "express";
import Estado from "./cidade";

const router: Router = Router();

router.post("/cidade", async (req: Request, res: Response) => {
  await (new Estado()).criarCidade(req, res);
});

router.get("/cidade", async (req: Request, res: Response) => {
  await (new Estado()).buscaCidade(req, res);
});

export default router;