import { Router } from 'express';
import CardApiController from './API/CardApiController';

const routes = Router();


routes.get('/cards/prompts', CardApiController.getPrompts);
routes.get('/cards/responses', CardApiController.getResponses);
routes.get('/cards/all', CardApiController.getAll);

export default routes;
