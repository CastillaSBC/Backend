import { Request, Response } from "express"

export async function me(req: Request, res: Response) {
    //@ts-ignore
    return res.status(200).json({ success: true, user: req.user})
}