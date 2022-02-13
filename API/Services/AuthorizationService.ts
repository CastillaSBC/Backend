import { Request, Response } from "express";
class AuthorizationService {
  public key: string;
  constructor(key: string) {
    this.key = key;
  }

  public async authorized(req: Request, res: Response, next) {
    const { level } = req.body;
    const authorization = req.headers["authorization"];
  }
}
