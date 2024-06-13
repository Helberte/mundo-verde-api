import { Router, Request, Response} from "express";


const router: Router = Router();


router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ mensagem: "Deu Certo!" });
})


export default router;