import { Router } from 'express';

const routes = new Router();

import OngController from './app/Controllers/OngController';
import IncidentController from './app/Controllers/IncidentController';
import ProfileController from './app/Controllers/ProfileController';
import SessionController from './app/Controllers/SessionController';

//Session
routes.post('/session', SessionController.store);

//Ongs
routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);

// Incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

// Profile Incidebts
routes.get('/profile', ProfileController.index);

export default routes;
