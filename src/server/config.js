import express from 'express';
import "dotenv/config";
import { hfswapiRouter } from '../routes/hfswapi.route.js';

// Instanciamos el servidor
export default class Server {

    constructor() {
        // Propiedades de la clase
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.path = '/hfswapi';
        this.routes();
    }

    routes() {
        // esta es la ruta que utilizaremos para las peticiones /hfswapi
        this.app.use(this.path, hfswapiRouter)
    }

    middlewares() {
        // middleware para la peticion post para obtener el body
        this.app.use(express.json());
    }
    listen() {

        // levantamos el servidor en el puerto configurado
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}