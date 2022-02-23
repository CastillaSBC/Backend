import { Router } from "express";
const Service = Router();
import ServiceController from "./../Controllers/Service"
Service.get('/', async (req,res) => await ServiceController.getService(req, res))

export default Service