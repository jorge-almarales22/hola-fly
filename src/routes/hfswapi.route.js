import { Router } from "express";
import { getLogs, getPeople, getPlanet, getWeightOnPlanetRandom } from "../controllers/hfswapi.controller.js";

export const hfswapiRouter = Router();

// Estas son las diferentes rutas de nuestra aplicacion
hfswapiRouter.get("/getPeople/:id", getPeople);
hfswapiRouter.get("/getPlanet/:id", getPlanet);
hfswapiRouter.get("/getWeightOnPlanetRandom/:planetId/:peopleId", getWeightOnPlanetRandom);
hfswapiRouter.get("/getLogs", getLogs);