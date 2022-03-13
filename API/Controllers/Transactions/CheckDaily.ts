import { Response, Request } from "express";
import prisma from "./../../Prisma/prismaFile";

export async function checkDaily(req: Request, res: Response) {
	const selection = await prisma.user.findUnique({
		where: {
			//@ts-expect-error
			id: req.user.id
		},
		select: {
			lastReward: true,
			azuCoins: true
		}
	}).catch((err) => {
		return res.status(500).json({
			success: false, error: err
		})
	});
	if (!selection) return res.status(404).json({ success: false, error: "We couldn't find the user." })
	//@ts-expect-error
	const calculations = Date.now() - selection!.lastReward
	if (calculations < 86400) return res.status(401).json({ success: false, error: `You must wait ${(86400 - calculations) / 3600} hours before redeeming your reward.` })

	await prisma.user.update({
		where: {
			//@ts-expect-error
			id: req.user.id
		},
		data: {
			//@ts-expect-error
			azuCoins: selection.azuCoins + 20
		}
	})
	return res.status(200).json({ success: true, message: "Successfully rewarded!"})
}
