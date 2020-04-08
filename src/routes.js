import express, { Router } from 'express';
import path from 'path';
import CardApiController from './API/CardApiController';
import GameController from './Controller/GameController';


const routes = Router();


routes.get('/cards/prompts', CardApiController.getPrompts);
routes.get('/cards/responses', CardApiController.getResponses);
routes.get('/cards/all', CardApiController.getAll);
routes.get('/games/new', async (req, res) => res.json(await GameController.newGame()));
routes.use('/docs', express.static(path.resolve('apidoc')));
routes.use('/coverage', express.static(path.resolve('__tests__', 'coverage', 'lcov-report')));

export default routes;
