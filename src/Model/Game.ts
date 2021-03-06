import { CardListInterface } from '../Controller/CardController';
import { PlayerInterface } from './Players';

export interface GameInterface {
    id: string;
    cards: CardListInterface;
    players: Record<string, PlayerInterface>;
}

class Game {
    public id: string

    public cards: CardListInterface

    public players: Record<string, PlayerInterface> = {}

    public constructor(id: string, cards: CardListInterface) {
      this.id = id;
      this.cards = cards;
    }
}

export default Game;
