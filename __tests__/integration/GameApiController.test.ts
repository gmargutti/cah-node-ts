import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import GameController from '../../src/Controller/GameController';

describe('API - Games', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  it('POST /games - should create a new game and return HTTP code 200', (done) => {
    supertest(app)
      .post('/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('DELETE /games/:id - should delete the game where ID equals to query param :id and return HTTP code 200', async (done) => {
    const game = await GameController.newGame();
    supertest(app)
      .delete(`/games/${game.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('DELETE /games/:id - should return HTTP code 404 - Not Found', async (done) => {
    const game = await GameController.newGame();
    const invalidId = game.id.substring(0, game.id.length - 2);
    supertest(app)
      .delete(`/games/${invalidId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404, done);
  });
});
