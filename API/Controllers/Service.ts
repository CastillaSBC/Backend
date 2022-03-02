import { Request, Response } from "express";
import { config } from "dotenv";
config();

export default class Service {
  public static getService(req: Request, res: Response) {
    res.status(200).json({ version: process.env.VERSION, time: Date.now() });
  }
}
