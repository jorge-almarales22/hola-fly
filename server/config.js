import express from 'express';
import "dotenv/config";
import { hfswapiRouter } from '../routes/hfswapi.route.js';

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.path = '/hfswapi';
        this.routes();
    }

    routes() {
        this.app.use(this.path, hfswapiRouter)
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}