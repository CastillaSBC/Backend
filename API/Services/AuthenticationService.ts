import database from "../Prisma/prismaFile";
import { Request, Response } from "express";
import { decode } from "jwt-simple";
import { config } from "dotenv";
import moment from "moment";
config();

export default class AuthenticationService {
  public static async onlyAuthenticated(req: Request, res: Response, next: () => void): Promise<any> {
    if (!req.headers.authorization) return res.status(400).json({ success: false, code: 2, error: "Authentication token not found" });

    let bearerToken: { exp: number; sub: number; ip: string | string[] };
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try {
      bearerToken = decode(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET!);
    } catch (e) {
      return res.status(401).json({ success: false, code: 0, error: "Invalid Token" })
    };

    if (bearerToken.exp <= moment().unix()) return res.status(401).json({ success: false, code: 3, error: "Your token has expired!" });

	if(bearerToken.ip != ip ) return res.status(401).json({ success: false, code: -1, error: "We need to verify your token. Please log in again."})

    const user = await database.user.findUnique({ where: { id: bearerToken.sub } });

    if (!user) return res.status(404).json({ success: false, code: 2, error: "Could not find user" });
    // @ts-ignore
    req.user = user;
    next();
  }
}
