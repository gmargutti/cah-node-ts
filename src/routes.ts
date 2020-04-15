import express, { Router } from 'express';
import path from 'path';
import CardApiController from './API/CardApiController';
import GameApiController from './API/GameApiController';
import PlayerApiController from './API/PlayerApiController';

const routes: Router = Router();


routes.get('/cards/prompts', CardApiController.getPrompts);
routes.get('/cards/responses', CardApiController.getResponses);
routes.get('/cards/all', CardApiController.getAll);

routes.post('/games', GameApiController.newGame);
routes.delete('/games/:id', GameApiController.endGame);
routes.get('/games', GameApiController.getGames);
routes.get('/games/:id', GameApiController.getGame);

routes.post('/players/join', PlayerApiController.joinGame);

routes.get('/', (_req, res) => res.sendFile(path.resolve('teste.html')));

routes.use('/docs', express.static(path.resolve('apidoc')));
routes.use('/coverage', express.static(path.resolve('__tests__', 'coverage', 'lcov-report')));

export default routes;
