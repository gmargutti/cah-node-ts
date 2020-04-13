import { v4 as uuidv4 } from 'uuid';
import { CardInterface } from '../Schemas/Card';

export interface PlayerInterface {
    id: string;
    gameId: string;
    name: string;
    prompt?: CardInterface;
    responses: CardInterface[];
    score: number;
}

export default class Player {
  public constructor(gameId: string, name: string) {
    this.id = uuidv4();
    this.name = name;
    this.gameId = gameId;
    this.responses = [];
  }

    public id: string;

    public gameId: string;

    public name: string;

    public prompt?: CardInterface;

    public responses: CardInterface[] = [];

    public score = 0;
}
