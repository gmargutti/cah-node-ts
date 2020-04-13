import mongoose from 'mongoose';
import dotenv from 'dotenv';
import GameController from '../../src/Controller/GameController';
import PlayerController from '../../src/Controller/PlayerController';
import GamesList from '../../src/Model/GamesList';
import Card from '../../src/Schemas/Card';
import Player from '../../src/Model/Players';

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
    const game = await GameController.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    expect(GamesList[game.id].players[player.id]).toBeInstanceOf(Player);
  });

  it('JoinGame: Should throw error: GameNotFound', async () => {
    const game = await GameController.newGame();
    const wrongGameId = game.id.substring(game.id.length - 2);
    expect(() => PlayerController.joinGame(wrongGameId, 'Gustavo')).toThrow('Game doesn\'t exist');
  });

  it('Should draw a full hand of Response Cards to the player', async () => {
    const game = await GameController.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    const responses = PlayerController.drawResponses(player.id);
    expect(responses.length).toBe(Number(process.env.MAX_HAND_SIZE));
  });

  it('DrawResponses: Should throw error PlayerNotFound', async () => {
    const game = await GameController.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    const wrongPlayerId = player.id.substring(player.id.length - 2);
    expect(() => PlayerController.drawResponses(wrongPlayerId)).toThrow('Player doesn\'t exist');
  });

  it('Should draw a single Prompt Card to the player', async () => {
    const game = await GameController.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    const prompt = PlayerController.drawPrompt(player.id);
    expect(prompt).toBeInstanceOf(Card);
  });

  it('DrawPrompt: Should throw error PlayerNotFound', async () => {
    const game = await GameController.newGame();
    const player = PlayerController.joinGame(game.id, 'Gustavo');
    const wrongPlayerId = player.id.substring(player.id.length - 2);
    expect(() => PlayerController.drawPrompt(wrongPlayerId)).toThrow('Player doesn\'t exist');
  });
});
