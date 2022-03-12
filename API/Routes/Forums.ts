import { Router } from "express";
import AuthenticationService from "./../Services/AuthenticationService"
import * as ForumController from "./../Controllers/Forum"

const Forums = Router();

Forums.post('/create/:id', AuthenticationService.onlyAuthenticated, async (req, res) => await ForumController.create(req, res))
Forums.post('/reply/:id', AuthenticationService.onlyAuthenticated, async (req, res) => await ForumController.reply(req, res))
Forums.get('/thread/:id', AuthenticationService.onlyAuthenticated, async (req, res) => await ForumController.find(req, res))
Forums.get('/threads', AuthenticationService.onlyAuthenticated, async (req, res) => await ForumController.findAll(req, res))

export default Forums;
