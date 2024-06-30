import { Router, Request, Response } from "express";
import GrupoEmpresa from "./grupo_empresa";

const router: Router = Router();

router.post("/grupos-empresas", async (req: Request, res: Response) => {
  await (new GrupoEmpresa()).criarGrupoEmpresa(req, res);
});

// router.get("/bairro", async (req: Request, res: Response) => {
//   await (new Bairro()).buscaBairro(req, res);
// });

export default router;