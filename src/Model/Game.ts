import { CardListInterface } from '../Controller/CardController';

export interface GameInterface {
    id: string;
    cards: CardListInterface;
    players?: object;
}

class Game {
    public id: string

    public cards: CardListInterface

    public players?: object

    public constructor(id: string, cards: CardListInterface) {
      this.id = id;
      this.cards = cards;
    }
}

export default Game;
