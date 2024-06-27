import { Router, Request, Response } from "express";
import Estado from "./estado";

const router: Router = Router();

router.post("/estado", async (req: Request, res: Response) => {
  await (new Estado()).criarEstado(req, res);
})

export default router;