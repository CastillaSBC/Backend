import { Request, Response } from "express"
import prisma from "../../Prisma/prismaFile";

export async function reply(req: Request, res: Response){
	const threadId = parseInt(req.params.threadId)
	if(!threadId) return res.status(400).json({success: false, error: "Invalid thread ID"})

	const thread = await prisma.threads.findUnique({ where: { id: threadId }}).catch((err) => res.status(500).json({ success: false, error: "Invalid thread ID" }))
	if(!thread) return res.status(400).json({success: false, error: "Thread not found."})

	let replyMessage : string =  req.body.message;
	if(!replyMessage) return res.status(400).json({success: false, error: "Invalid reply message"})

	if(replyMessage.trim().length > 500 || replyMessage.trim().length < 10 ) return res.status(500).json({success: false, error: "Reply must be at least 10 characters or lesser than 500 characters"})

	//@ts-expect-error
	const userId = req.user.id

	const response = await prisma.responses.create({
		data: {
			threadID: threadId,
			creatorID: userId,
			body: replyMessage,
			createdAt: Date.now()
		}
	})

	return res.status(200).json({ success: true, message: "Reply successfully created." })

}
