import { Router, Request, Response } from "express";
import Estado from "./estado";

const router: Router = Router();

router.post("/estado", async (req: Request, res: Response) => {
  await (new Estado()).criarEstado(req, res);
})

router.put("/estado", async (req: Request, res: Response) => {
  await (new Estado()).atualizaEstado(req, res);
})

router.get("/estado", async (req: Request, res: Response) => {
  await (new Estado()).buscaEstado(req, res);
})


export default router;