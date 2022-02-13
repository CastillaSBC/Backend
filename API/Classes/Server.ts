import express, { Express, Router } from "express";
import { config } from "dotenv";
import Logger from "./../Utilities/Log";
import helmet from "helmet";
config();

class Server {
  public app: Express;
  public port: number = parseInt(process.env.PORT, 10);
  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(express.json())
  }

  public async registerRoutes() {
    Logger.log(`Logging routes to memory...`);
    this.app.use("/static/", express.static("static"));
    this.app.use(
      "/authentication",
      (await import("./../Routes/Authentication")).default
    );
    this.app.get("/", (req, res) => {
      res.send({Nig: true})
    } );

    Logger.log(`Routes logged.`);

  }

  public async listen(port?: number) {
    Logger.log(`Starting service ${process.env.SERVICE}`);
    this.registerRoutes()
    this.app.listen(port ? port : this.port);
    Logger.log(`Service ${process.env.SERVICE} started on port ${this.port}`);
  }
}

const SERVICE = new Server().listen();
