import { Router, Request, Response } from "express";
import autenticacao from "@controllers/controle_acesso/autenticacao";


const router: Router = Router();

/*

*/
router.get("/", (req: Request, res: Response) => {
  autenticacao.obterUsuarios(req, res);
})

router.put("/", (_req: Request, res: Response) => {
  res.status(200).json({ mensagem: "Deu Certo!" });
})

router.delete("/", (_req: Request, res: Response) => {
  res.status(200).json({ mensagem: "Deu Certo!" });
})

router.post("/", (_req: Request, res: Response) => {
  res.status(200).json({ mensagem: "Deu Certo!" });
})


export default router;