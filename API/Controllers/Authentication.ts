import { Request, Response } from "express";
import prisma from "../Prisma/prismaFile";
import Logger from "../Utilities/Log";
import { decode, encode } from "jwt-simple";
import { hash, verify } from "argon2";
import { Prisma } from "@prisma/client";
export default class Authentication {
  public static async register(req: Request, res: Response): Promise<any> {
    const username: string = req.body["username"];
    const password: string = req.body["password"];

    if (!username || !password) {
      Logger.log(
        `User ${req.ip} sumbitted an invalid form at Authentication.authenticate`
      );
      return res.send({
        success: false,
        error: "Invalid username or password",
      });
    }

    if (username.length < 4 || username.length > 32) {
      return res
        .status(400)
        .json({ message: "Username must have 4-32 characters" });
    }
    if (password.length < 6 || password.length > 64) {
      return res
        .status(400)
        .json({ message: "Password must have 6-64 characters" });
    }

    const userTest = await prisma.user
      .findUnique({ where: { username } })
      .catch(async (err) => {
        console.log(`GAY`)

      });
    if (userTest)
      return res.send({
        success: false,
        error: "Username taken."
      })
    const hashedPassword = await hash(password)
    const user: Prisma.UserCreateInput = {
      username,
      password: hashedPassword,
      image: "",
      description: "New to your mom",
    };

    await prisma.user.create({ data: user });

    return res.send({
      success: true,
      message: "User created successfully",
    });

  }
  /**
   * Route for checking the user state.
   * @param req 
   * @param res 
   */
  public static async me(req: Request, res: Response){
    const token = req.headers.authorization;

    if(!token)
      return res.send({success: false, message:"User not authenticated."})
    
    const bearer = token.split(" ")[1]
    
    const {sub} = decode(bearer, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({where: {id: sub}})

    return res.send(user)
  }

  public static async authenticate(req: Request, res: Response) {
    const username: string = req.body["username"];
    const password: string = req.body["password"];

    if (!username || !password) {
      Logger.log(
        `User ${req.ip} sumbitted an invalid form at Authentication.authenticate`
      );
      return res.send({
        success: false,
        error: "Invalid username or password",
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user)
      return res.send({
        success: false,
        error: "User not found",
      });

      let passwordCorrect = await verify(user.password, password )


    if (passwordCorrect === false) {
      return res.send({
        success: false,
        error: "Incorrect password",
      });
    }

    let JWT = encode(
      {
        sub: user.id,
        exp: Date.now() + 2592000, // 30 days
      },
      process.env.JWT_SECRET
    );

    res.send({
      success: true,
      message: `User ${user.username} logged in.`,
      token: JWT,
    });
  }
}
