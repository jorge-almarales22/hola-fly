import { Router } from "express";
import { getPeople } from "../controllers/hfswapi.controller.js";

export const hfswapiRouter = Router();

hfswapiRouter.get("/getPeople/:id", getPeople);