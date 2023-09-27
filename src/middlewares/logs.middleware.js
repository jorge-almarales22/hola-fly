import { request } from "express";
import Database from "../database/config.js";

export const logsMiddleware = (req = request, res, next) => {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    const headers = JSON.stringify(req.headers);
    const originalUrl = req.originalUrl;

    const log = {
        ip,
        headers,
        originalUrl
    }

    const database = new Database();

    database.addLog(log);

    next()
}