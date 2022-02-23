import { Request, Response } from "express"
import { decode } from "jwt-simple"
import prisma from "../../Prisma/prismaFile";

export async function me(req: Request, res: Response) {
    const token = req.headers.authorization;

    const bearer = token.split(" ")[1]

    const { sub } = decode(bearer, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({ where: { id: sub } })

    return res
        .status(200)
        .json(user)
}