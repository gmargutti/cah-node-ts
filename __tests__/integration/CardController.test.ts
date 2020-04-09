import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';


describe('API - Card', () => {
  afterAll(() => {
    mongoose.connection.close();
  });
  it('GET /cards/responses - should return Response cards', async (done) => {
    supertest(app)
      .get('/cards/responses')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('GET /cards/prompts - should return Prompt cards', async (done) => {
    supertest(app)
      .get('/cards/prompts')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('GET /cards/all - should return All cards', async (done) => {
    supertest(app)
      .get('/cards/all')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
});
