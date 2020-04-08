import CardSchema, { CardInterface } from '../Schemas/Card';

export interface CardListInterface {
  prompts: CardInterface[];
  responses: CardInterface[];
}

class CardController {
  private CardsResponse?: CardInterface[]

  private CardsPrompt?: CardInterface[]


  public getResponses = async (): Promise<CardInterface[]> => {
    if (this.CardsResponse) {
      return this.CardsResponse;
    }

    const responses = await CardSchema.find({ type: 'Response' });
    this.CardsResponse = responses;
    return this.CardsResponse;
  }

  public getPrompts = async (): Promise<CardInterface[]> => {
    if (this.CardsPrompt) {
      return this.CardsPrompt;
    }

    const prompts = await CardSchema.find({ type: 'Prompt' });
    this.CardsPrompt = prompts;
    return this.CardsPrompt;
  }

  public getAll = async (): Promise<CardListInterface> => {
    const prompts = await this.getPrompts();
    const responses = await this.getResponses();

    return {
      responses, prompts,
    };
  }
}

export default new CardController();
