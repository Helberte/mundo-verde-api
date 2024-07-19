import { Router, Request, Response } from "express";
import Menu from "./menu";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Menu()).criarMenu(req, res);
});

export default router;