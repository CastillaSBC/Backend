
import { Request, Response } from "express"
import prisma from "../../Prisma/prismaFile";

export async function create(req: Request, res: Response){
    //? Q: Why are you doing Math.round?
    //! A: So the curious seekers get their
    //! > faces surprised lol
    const category = await prisma.category.findUnique({ where: { id: parseInt(req.params.id)}})
    if(!category){
        return res 
                .status(404)
                .json({success: false, error: "No category with the id was found."})
    }
    const id = Math.round(parseInt(req.params.id))
    if(id !>= 1 || id !<= 8){
        return res
        .status(402)
        .json({success: false, error: "Invalid ID"})
    }
    if(!req.body.title || !req.body.body){

    }
}


