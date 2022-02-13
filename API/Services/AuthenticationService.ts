import database from "../Prisma/prismaFile";
import { Request, Response } from "express";
import { decode, encode } from "jwt-simple";
import { config } from "dotenv";
import moment from "moment";
config();
export default class AuthenticationService {


  public static async onlyAuthenticated(
    req: Request,
    res: Response,
    next
  ): Promise<any> {
    if (!req.headers.authorization) {
      return res.send({
        success: false,
        error: "Authentication token not found",
      });
    }

    let bearerToken = decode(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (bearerToken.exp <= moment().unix())
      return res.send({
        success: false,
        error: "Your token has expired!",
      });

    let user = await database.user.findUnique({
      where: {
        id: bearerToken.sub,
      },
    });

    if (!user)
      return res.send({
        success: false,
        error: "Could not find user",
      });

    req.user = user;
    next();
  }
}
