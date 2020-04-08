import { Router } from 'express';
import CardController from './Controller/CardController';

const routes = Router();


routes.get('/cards/prompts', CardController.getPrompts);
routes.get('/cards/responses', CardController.getResponses);
routes.get('/cards/all', CardController.getAll);

export default routes;
