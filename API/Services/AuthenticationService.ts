import database from "../Prisma/prismaFile";
import { Request, Response } from "express";
import { decode } from "jwt-simple";
import { config } from "dotenv";
import moment from "moment";
config();

export default class AuthenticationService {
  public static async onlyAuthenticated(req: Request, res: Response, next: () => void): Promise<any> {
    if (!req.headers.authorization) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Authentication token not found",
        });
    }
    
    let bearerToken: { exp: number; sub: any; };

    try {
      bearerToken = decode(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    } catch (e) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Token" });
    }

    if (bearerToken.exp <= moment().unix())
      return res
        .status(401)
        .json({
          success: false,
          error: "Your token has expired!",
        });

    const user = await database.user.findUnique({
      where: {
        id: bearerToken.sub,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({
          success: false,
          error: "Could not find user",
        });

    req.user = user;
    next();
  }
}
