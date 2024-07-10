import { Router, Request, Response } from "express";
import Pessoa from "./pessoa";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Pessoa()).criarPessoa(req, res);
});

router.post("/endereco", async (req: Request, res: Response) => {
  await (new Pessoa()).adicionaEnderecoPessoa(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await (new Pessoa()).buscaPessoas(req, res);
});

export default router;