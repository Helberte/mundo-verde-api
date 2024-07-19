import { Router, Request, Response } from "express";
import Menu from "./menu";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  await (new Menu()).criarMenu(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await (new Menu()).consultaMenus(req, res);
});

export default router;