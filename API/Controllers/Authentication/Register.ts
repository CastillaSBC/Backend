import { Request, Response } from "express"
import { decode } from "jwt-simple"
import prisma from "../../Prisma/prismaFile";
import Logger from "../../Utilities/Log"
import { Prisma } from "@prisma/client"
import { hash } from "argon2"

export async function register(req: Request, res: Response) {
    const username: string = req.body["username"];
    const password: string = req.body["password"];

    if (!username || !password) {
        return res
            .status(400)
            .json({
                success: false,
                error: "Invalid username or password",
            });
    }

    if (username.length < 4 || username.length > 32) {
        return res
            .status(400)
            .json({ success: false, message: "Username must have 4-32 characters" });
    }
    if (password.length < 6 || password.length > 64) {
        return res
            .status(400)
            .json({ success: false, message: "Password must have 6-64 characters" });
    }

    const foundUser = await prisma.user
        .findUnique({ where: { username } })
        .catch((err) => Logger.error(err, "Register.ts"));

    if (foundUser) {
        return res
            .status(400)
            .json({ success: false, error: "Username taken." })
    }

    const user: Prisma.UserCreateInput = {
        username,
        password: await hash(password),
        image: "",
        description: "New to your mom",
    };

    await prisma.user.create({ data: user });

    return res
        .status(201)
        .json({
            success: true,
            message: "User created successfully",
        });
}