import { Router } from 'express';

const routes = new Router();

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
routes.get('/incidents', IncidentController.index);

// Profile Incidents
routes.post('/ong/incidents', OngIncidentController.store);
routes.get('/ong/incidents', OngIncidentController.index);
routes.delete('/ong/incidents/:id', OngIncidentController.delete);

export default routes;
