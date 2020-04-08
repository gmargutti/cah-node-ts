import { Request, Response } from 'express';
import CardSchema, { CardInterface } from '../Schemas/Card';
import CardController from '../Controller/CardController';

class CardApiController {
  public getResponses = async (req: Request, res: Response): Promise<Response> => {
    const cardsResponse = CardController.getResponses();
    const responses = await CardSchema.find({ type: 'Response' });
    return res.json(cardsResponse);
  }

  public getPrompts = async (req: Request, res: Response): Promise<Response> => {
    const prompts = await CardSchema.find({ type: 'Prompt' });

    const cardsPrompt = CardController.getPrompts();
    return res.json(cardsPrompt);
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const cards = CardController.getAll();
    return res.json(cards);
  }
}

export default new CardApiController();
