import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

const routes = new Router();

import authMiddleware from './app/middlewares/auth';
import OngController from './app/Controllers/OngController';
import IncidentController from './app/Controllers/IncidentController';
import OngIncidentController from './app/Controllers/OngIncidentController';
import SessionController from './app/Controllers/SessionController';

//Session
routes.post('/session', SessionController.store);

//Ongs
routes.post('/register', OngController.store);
routes.get('/ongs', OngController.index);

// Incidents
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index,
);

routes.use(authMiddleware);
// Profile Incidents
routes.post(
  '/ong/incidents',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  OngIncidentController.store,
);
routes.get(
  '/ong/incidents',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  OngIncidentController.index,
);
routes.delete(
  '/ong/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    }),
  }),
  OngIncidentController.delete,
);

export default routes;
