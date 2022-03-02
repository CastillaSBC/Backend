import { Router } from "express";
import AuthenticationService from "./../Services/AuthenticationService"
import * as ForumController from "./../Controllers/Forum"

const Forums = Router();

Forums.post('/create/:id', AuthenticationService.onlyAuthenticated, async (req, res) => await ForumController.create(req, res))

export default Forums;