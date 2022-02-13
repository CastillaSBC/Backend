import { Request, Response } from "express"
import { encode } from "jwt-simple"
import prisma from "../../Prisma/prismaFile";
import Logger from "../../Utilities/Log"
import { verify } from "argon2"

export async function authenticate(req: Request, res: Response) {
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

    let user = await prisma.user.findUnique({ where: { username: username } });

    if (!user) {
        return res
            .status(404)
            .json({
                success: false,
                error: "User not found",
            });
    }

    const passwordCorrect = await verify(user.password, password)

    if (passwordCorrect === false) {
        return res
            .status(403)
            .json({
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

    res.status(200).json({
        success: true,
        message: `User ${user.username} logged in.`,
        token: JWT,
    })
}