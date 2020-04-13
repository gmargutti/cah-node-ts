import { v4 as uuidv4 } from 'uuid';
import Game, { GameInterface } from '../Model/Game';
import CardController from '../Controller/CardController';
import GamesList from '../Model/GamesList';

class GameController {
  public async newGame(): Promise<GameInterface> {
    const id = uuidv4();
    const cards = await CardController.getAll();
    const game = new Game(id, cards);
    GamesList[game.id] = game;
    return game;
  }

  public endGame(gameId: string): GameInterface {
    const game = GamesList[gameId];
    if (!game) {
      const error = new Error();
      error.message = 'Game doesn\'t exist';
      error.name = 'GameNotFound';
      throw error;
    }
    delete GamesList[gameId];
    return game;
  }

  public getGames(): Record<string, GameInterface> {
    return GamesList;
  }

  public getGame(gameId: string): GameInterface {
    const game = GamesList[gameId];
    if (!game) {
      const error = new Error('Game doesn\'t exist');
      error.name = 'GameNotFound';
      throw error;
    }
    return game;
  }
}

export default new GameController();
