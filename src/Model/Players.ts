import { v4 as uuidv4 } from 'uuid';
import { CardInterface } from '../Schemas/Card';
import { GameInterface } from './Game';

export interface PlayerInterface {
    id: string;
    game: GameInterface;
    name: string;
    prompt?: CardInterface;
    responses: CardInterface[];
    score: number;
}

export default class Player {
  public constructor(game: GameInterface, name: string) {
    this.id = uuidv4();
    this.name = name;
    this.game = game;
    this.responses = [];
  }

    public id: string;

    public game: GameInterface;

    public name: string;

    public prompt?: CardInterface;

    public responses: CardInterface[] = [];

    public score = 0;
}
