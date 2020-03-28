import express from 'express';
import routes from './routes';
import { errors } from 'celebrate';
import cors from 'cors';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.server.use(errors());
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
