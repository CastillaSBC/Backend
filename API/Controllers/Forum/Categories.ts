import { Request, Response } from "express"
import prisma from "../../Prisma/prismaFile";

export async function categories(req: Request, res: Response) {
	const categories = await prisma.category.findMany().catch((err) => {
		return res.status(500).json({success: false, error: "There was an internal error fetching the categories."})
	});

	return res.status(200).json({success: true, categories: categories});
}
