import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import morgan from "morgan";

export class Server{
  private httpServer: http.Server;

  readonly express: express.Express;

  constructor() {
    this.express = express();
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

    this.httpServer = this.express.listen(process.env.APP_PORT, () => {
      console.log(`O servidor está executando na porta ${process.env.APP_PORT}!`);
    })
  }

  public stop() {
    this.httpServer.close();
  }
}

export default new Server();