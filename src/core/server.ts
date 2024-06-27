import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import morgan from "morgan";
import router from "@core/routers";
import Database from "@core/database";

export class Server{
  private httpServer: http.Server;

  readonly express: express.Express;
  readonly database: Database

  constructor() {
    this.express  = express();
    this.database = new Database();
  }

  private middlewares() {
    this.express.use(cookieParser());
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(morgan("common"));
    this.express.use(cors({
      credentials: true,
      origin: String(process.env.CORS_ORIGIN)
    }));
  }

  environment() {

  }

  async start() {
    dotenv.config();

    this.middlewares();

    await this.database.config();
    this.express.use("/", router);

    this.httpServer = this.express.listen(process.env.APP_PORT, () => {
      console.log(`O servidor está executando na porta ${process.env.APP_PORT}!`);
    })
  }

  public stop() {
    this.httpServer.close();
  }
}

export default new Server();