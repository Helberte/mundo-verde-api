import { Router, Request, Response } from "express";
import EmpresasController from "./empresa";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new EmpresasController()).criarEmpresa(req, res);
});

// router.get("/grupos-empresas", async (req: Request, res: Response) => {
//   await (new GrupoEmpresa()).buscaGrupoEmpresa(req, res);
// });

// router.delete("/grupos-empresas", async (req: Request, res: Response) => {
//   await (new GrupoEmpresa()).excluirGrupoEmpresa(req, res);
// });

export default router;