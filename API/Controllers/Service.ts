import { Request, Response } from "express";
import Logger from "../Utilities/Log";
import { config } from "dotenv";
config();

export default class Service {
  public static getService(req: Request, res: Response) {
    res.send({
      version: process.env.VERSION,
      time: Date.now(),
    });
  }
}
