import express from 'express';
import "dotenv/config";

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.paths = {
            auth: '/api',
        }
        this.routes();
    }

    routes() {
        this.app.use(this.paths.auth, (req, res) => {
            res.send('Hello World');
        })
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