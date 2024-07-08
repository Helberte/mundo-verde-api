import { Router, Request, Response } from "express";
import Pessoa from "./pessoa";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Pessoa()).criarPessoa(req, res);
});

// router.get("/pessoa", async (req: Request, res: Response) => {
//   await (new Estado()).buscaCidade(req, res);
// });

export default router;