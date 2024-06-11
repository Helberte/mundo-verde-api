import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export class Server{

  readonly express: express.Express;

  constructor() {
    this.express = express();
  }

  private middlewares() {
    this.express.use(cookieParser());
    this.express.use(express.json());
    this.express.use(cors({
        credentials: true,
        origin: String(process.env.CORS_ORIGIN)
    }));
  }

  environment() {

  }

  async start() {
    
  }

  public stop() {
    
  }
}

export default new Server();