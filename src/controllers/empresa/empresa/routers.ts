import { Router, Request, Response } from "express";
import Empresas from "./empresa";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Empresas()).criarEmpresa(req, res);
});

router.post("/endereco", async (req: Request, res: Response) => {
  await (new Empresas()).adicionaEnderecoEmpresa(req, res);
});

router.get("/endereco", async (req: Request, res: Response) => {
  await (new Empresas()).obtemEnderecoEmpresa(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await (new Empresas()).buscaEmpresas(req, res);
});

router.put("/", async (req: Request, res: Response) => {
  await (new Empresas()).editarEmpresa(req, res);
});

export default router;