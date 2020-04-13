import dotenv from 'dotenv';
import mongoose from 'mongoose';
import GameController from '../../src/Controller/GameController';
import Game from '../../src/Model/Game';
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
    expect(GamesList[game.id]).toBeInstanceOf(Game);
  });

  it('should remove existing game from GamesList', async () => {
    const game = await GameController.newGame();
    GameController.endGame(game.id);
    expect(GamesList[game.id]).toBe(undefined);
  });

  it('should throw error: invalid id', async () => {
    const game = await GameController.newGame();
    const invalidId = game.id.substring(0, game.id.length - 2);
    expect(() => GameController.endGame(invalidId)).toThrow('Game doesn\'t exist');
  });

  it('should return all games on the list', async () => {
    await Promise.all([GameController.newGame(), GameController.newGame(), GameController.newGame()]);
    expect(GameController.getGames()).toBeInstanceOf(Object);
  });

  it('should return game with given id', async () => {
    const game = await GameController.newGame();
    const foundGame = GameController.getGame(game.id);
    expect(game.id).toBe(foundGame.id);
  });

  it('should return error: GameNotFound', async () => {
    const game = await GameController.newGame();
    const invalidId = game.id.substring(game.id.length - 2);
    expect(() => GameController.getGame(invalidId)).toThrow('Game doesn\'t exist');
  });
});
