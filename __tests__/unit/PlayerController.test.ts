import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GameController from '../../src/Controller/GameController';
import PlayerController from '../../src/Controller/PlayerController';
import GamesList from '../../src/Model/GamesList';
import Card from '../../src/Schemas/Card';

describe('PlayerController', () => {
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
  it('Should add player to a given game', async () => {
    const controller = new GameController(GamesList.games);
    const game = await controller.newGame();
    PlayerController.joinGame(game.id, 'Gustavo');
    expect(game.players.filter((p) => p.name === 'Gustavo').length).toBe(1);
  });

  it('Should throw error: GameNotFound', async () => {
    const controller = new GameController(GamesList.games);
    const game = await controller.newGame();
    const wrongGameId = game.id.substring(game.id.length - 2);
    expect(() => PlayerController.joinGame(wrongGameId, 'Gustavo')).toThrow('Game doesn\'t exist');
  });

  it('Should draw a full hand of Response Cards to the player', async () => {
    const controller = new GameController(GamesList.games);
    const game = await controller.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    const responses = PlayerController.drawResponses(game.id, player.id);
    expect(responses.length).toBe(Number(process.env.MAX_HAND_SIZE));
  });

  it('Should draw a single Prompt Card to the player', async () => {
    const controller = new GameController(GamesList.games);
    const game = await controller.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    const prompt = PlayerController.drawPrompt(game.id, player.id);
    expect(prompt).toBeInstanceOf(Card);
  });
});
