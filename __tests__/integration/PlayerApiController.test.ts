import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import GameController from '../../src/Controller/GameController';

describe('API - Players', () => {
  afterAll(() => {
    mongoose.connection.close();
  });


  it('should join player to the game and return HTTP 200', async (done) => {
    const game = await GameController.newGame();
    supertest(app)
      .post('/players/join')
      .set('Accept', 'application/json')
      .send({ gameId: game.id, playerName: 'Gustavo' })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('Should return HTTP 404', async (done) => {
    const game = await GameController.newGame();
    const gameId = game.id.substring(game.id.length - 2);
    supertest(app)
      .post('/players/join')
      .set('Accept', 'application/json')
      .send({ gameId, playerName: 'Gustavo' })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404, done);
  });
});
