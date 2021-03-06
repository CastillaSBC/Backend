import { Request, Response } from "express"
import prisma from "../../Prisma/prismaFile";
import Logger from "../../Utilities/Log"
import { Prisma } from "@prisma/client"
import { hash } from "argon2"

export async function register(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const username: string = req.body["username"];
    const password: string = req.body["password"];

    if (!username || !password)
        return res.status(400).json({
            success: false,
            error: "Invalid username or password",
        });


    if (username.length < 4 || username.length > 32) return res.status(400).json({ success: false, message: "Username must have 4-32 characters" });

    if (password.length < 6 || password.length > 64) return res.status(400).json({ success: false, message: "Password must have 6-64 characters" });


    const foundUser = await prisma.user.findUnique({ where: { username } }).catch((err: any) => Logger.error(err, "Register.ts"));

    if (foundUser) return res.status(400).json({ success: false, error: "Username taken." })

    const user: Prisma.UserCreateInput = {
        username: username,
        password: await hash(password),
        description: "New to your mom",
        createdAt: Date.now()
    };

    await prisma.user.create({ data: user });

    return res.status(201).json({ success: true, message: "User created successfully" });
}