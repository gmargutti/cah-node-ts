import { v4 as uuidv4 } from 'uuid';
import Game, { GameInterface } from '../Model/Game';
import CardController from '../Controller/CardController';

class GameController {
  private list: GameInterface[]

  public constructor(list: GameInterface[]) {
    this.list = list;
  }

  public async newGame(): Promise<GameInterface> {
    const id = uuidv4();
    const cards = await CardController.getAll();
    const game = new Game(id, cards);
    this.list.push(game);
    return game;
  }

  public endGame(gameId: string): GameInterface {
    const game = this.list.filter((g) => g.id === gameId)[0];
    if (!game) {
      const error = new Error();
      error.message = 'Game doesn\'t exist';
      error.name = 'GameNotFound';
      throw error;
    }
    const gameIndex = this.list.indexOf(game);
    this.list.splice(gameIndex, 1);
    return game;
  }

  public getGames(): GameInterface[] {
    return this.list;
  }

  public getGame(gameId: string): GameInterface {
    const game = this.list.filter((g) => g.id === gameId)[0];
    if (!game) {
      const error = new Error('Game doesn\'t exist');
      error.name = 'GameNotFound';
      throw error;
    }
    return game;
  }
}

export default GameController;
