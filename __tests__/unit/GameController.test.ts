import dotenv from 'dotenv';
import mongoose from 'mongoose';
import GameController from '../../src/Controller/GameController';
import { GameInterface } from '../../src/Model/Game';

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
    const list: GameInterface[] = [];
    const controller = new GameController(list);
    const game = await controller.newGame();
    expect(list.filter((g) => g == game).length).toBe(1);
  });

  it('should remove existing game from GamesList', async () => {
    const list: GameInterface[] = [];
    const controller = new GameController(list);
    const game = await controller.newGame();
    controller.endGame(game.id);
    expect(list.filter((g) => g == game).length).toBe(0);
  });

  it('should throw error: invalid id', async () => {
    const list: GameInterface[] = [];
    const controller = new GameController(list);
    const game = await controller.newGame();
    const invalidId = game.id.substring(0, game.id.length - 2);
    expect(() => controller.endGame(invalidId)).toThrow('Game doesn\'t exist');
  });

  it('should return all games on the list', async () => {
    const list: GameInterface[] = [];
    const controller = new GameController(list);
    await Promise.all([controller.newGame(), controller.newGame(), controller.newGame()]);
    expect(controller.getGames().length).toBe(3);
  });

  it('should return game with given id', async () => {
    const list: GameInterface[] = [];
    const controller = new GameController(list);
    const game = await controller.newGame();
    const foundGame = controller.getGame(game.id);
    expect(game.id).toBe(foundGame.id);
  });

  it('should return error: GameNotFound', async () => {
    const list: GameInterface[] = [];
    const controller = new GameController(list);
    const game = await controller.newGame();
    const invalidId = game.id.substring(game.id.length - 2);
    expect(() => controller.getGame(invalidId)).toThrow('Game doesn\'t exist');
  });
});
