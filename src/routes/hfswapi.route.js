import { Router } from "express";
import { getLogs, getPeople, getPlanet, getWeightOnPlanetRandom } from "../controllers/hfswapi.controller.js";

export const hfswapiRouter = Router();

hfswapiRouter.get("/getPeople/:id", getPeople);
hfswapiRouter.get("/getPlanet/:id", getPlanet);
hfswapiRouter.post("/getWeightOnPlanetRandom", getWeightOnPlanetRandom);
hfswapiRouter.get("/getLogs", getLogs);