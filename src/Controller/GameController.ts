import { v4 as uuidv4 } from 'uuid';
import Game, { GameInterface } from '../Model/Game';
import CardController from '../Controller/CardController';
import GamesList from '../Model/GamesList';

class GameController {
  public async newGame(): Promise<GameInterface> {
    const id = uuidv4();
    const cards = await CardController.getAll();
    const game = new Game(id, cards);
    GamesList.games.push(game);
    return game;
  }

  public endGame(gameId: string): GameInterface {
    const game = GamesList.games.filter((g) => g.id === gameId)[0];
    if (!game) {
      throw new Error('Game doesn\'t exist');
    }
    GamesList.games = GamesList.games.filter((g) => g !== game);
    return game;
  }
}

export default new GameController();
