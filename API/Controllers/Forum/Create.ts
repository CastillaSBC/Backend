
import { Request, Response } from "express"
import prisma from "../../Prisma/prismaFile";

export async function create(req: Request, res: Response) {
    const category = await prisma.category.findUnique({ where: { id: parseInt(req.params.id) } }).catch((err) => res.status(500).json({ success: false, error: "Invalid ID" }))
    if (!category) return res.status(404).json({ success: false, error: "No category with the id was found." })

    if (!req.body.title || !req.body.body) return res.status(400).json({ success: false, error: "No title or body was provided." })

    const title: string = req.body.title.trim()
    const body: string = req.body.body.trim()

    if (title.length < 5 || title.length > 20) return res.status(400).json({ success: false, error: "Title must be above 5 characters and under 20 characters." })

    if (body.length < 15 || body.length > 2000) return res.status(400).json({ success: false, error: "Body must be above 15 characters and under 2000 characters." })

    const thread = await prisma.threads.create({
        data: {
            //@ts-ignore
            creatorID: req.user.userId,
            title: title,
            body: body,
            categoryID: parseInt(req.params.id),
            glowingSince: Date.now()
        }
    })

    if (!thread) return res.status(500).json({ success: false, error: "There was an internal error creating your thread.!" })

    return res.status(200).json({ success: true, message: "Thread successfully created.", thread: thread.id })
}


