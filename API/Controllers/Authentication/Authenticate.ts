import { Request, Response } from "express"
import { encode } from "jwt-simple"
import prisma from "../../Prisma/prismaFile";
import { verify } from "argon2"

export async function authenticate(req: Request, res: Response) {
    const username: string = req.body["username"];
    const password: string = req.body["password"];
	const ip: string | string[] | undefined = req.headers['x-forwarded-for'] || req.socket.remoteAddress

	if(!ip) return res.status(500).json({success: false, error: "Something went wrong."})

    if (!username || !password) return res.status(400).json({ success: false, error: "No username or password found." });

    let user = await prisma.user.findUnique({ where: { username: username } });

	if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const passwordCorrect = await verify(user.password, password)

    if (passwordCorrect === false) return res.status(403).json({ success: false, error: "Incorrect password" });

    const JWT = encode({ sub: user.id, exp: Date.now() + 2592000, ip: ip }, process.env.JWT_SECRET!); // 2592000 = 30 Days

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {

		}
	})

    return res.status(200).json({ success: true, message: `User ${user.username} logged in.`, token: JWT })
}
