import { Request, Response } from "express"
import prisma from "../../Prisma/prismaFile";

export async function findAll(req: Request, res: Response) {
    const category = parseInt(req.params.id);
	if (!category) return res.status(404).json({ success: false, error: "No category ID!" })
    const threads = await prisma.threads.findMany({ where: { categoryID: category } }).catch((err) => res.status(500).json({ success: false, error: "Invalid category ID" }))

	if (!threads) return res.status(404).json({ success: false, error: "We couldn't find any threads." })
    return res.status(200).json({ success: true, threads: threads })
}


