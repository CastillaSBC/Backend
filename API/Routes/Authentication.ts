import { Router } from "express";
import AuthenticationController from "./../Controllers/Authentication";

const Authentication = Router();

Authentication.post("/authenticate", async (req, res) => await AuthenticationController.authenticate(req, res));
Authentication.post('/register', async (req, res) => await AuthenticationController.register(req, res))
Authentication.get('/me', async (req, res) => await AuthenticationController.me(req, res))
export default Authentication;
