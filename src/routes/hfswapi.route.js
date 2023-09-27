import { Router } from "express";
import { getPeople, getPlanet } from "../controllers/hfswapi.controller.js";

export const hfswapiRouter = Router();

hfswapiRouter.get("/getPeople/:id", getPeople);
hfswapiRouter.get("/getPlanet/:id", getPlanet);