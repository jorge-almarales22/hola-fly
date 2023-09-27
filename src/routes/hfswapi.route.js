import { Router } from "express";
import { getLogs, getPeople, getPlanet, getWeightOnPlanetRandom } from "../controllers/hfswapi.controller.js";
import { logsMiddleware } from "../middlewares/logs.middleware.js";

export const hfswapiRouter = Router();

hfswapiRouter.get("/getPeople/:id", logsMiddleware, getPeople);
hfswapiRouter.get("/getPlanet/:id", logsMiddleware, getPlanet);
hfswapiRouter.post("/getWeightOnPlanetRandom", logsMiddleware, getWeightOnPlanetRandom);
hfswapiRouter.get("/getLogs", getLogs);