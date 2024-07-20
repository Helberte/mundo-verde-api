import { Router, Request, Response } from "express";
import Perfil from "./perfil";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Perfil()).criarPerfil(req, res);
});

// router.get("/", async (req: Request, res: Response) => {
//   await (new Perfil()).consultaPerfis(req, res);
// });

export default router;