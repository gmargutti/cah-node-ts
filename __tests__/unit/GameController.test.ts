import dotenv from 'dotenv';
import mongoose from 'mongoose';
import GameController from '../../src/Controller/GameController';
import GamesList from '../../src/Model/GamesList';

describe('GameController', () => {
  beforeAll(async () => {
    dotenv.config({ path: '.env' });
    await mongoose.connect(`${process.env.MONGODB_CONNECTIONSTRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should add new game to GamesList', async () => {
    const game = await GameController.newGame();
    expect(GamesList.games.filter((g) => g == game).length).toBe(1);
  });

  it('should remove existing game from GamesList', async () => {
    const game = await GameController.newGame();
    GameController.endGame(game.id);
    expect(GamesList.games.filter((g) => g == game).length).toBe(0);
  });

  it('should throw error: invalid id', async () => {
    const game = await GameController.newGame();
    const invalidId = game.id.substring(0, game.id.length - 2);
    expect(() => GameController.endGame(invalidId)).toThrow('Game doesn\'t exist');
  });
});
