import { Request, Response } from 'express';
import CardController from '../Controller/CardController';

class CardApiController {
/**
 * @api {get} /cards/responses Get Responses
 * @apiName GetCardsResponses
 * @apiGroup Cards
 *
 * @apiSuccess {Array} Cards
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              type: "Response",
 *              text: "Card's Response text",
 *              language: "en-us",
 *          }
 *     ]
 *
 * @apiError QueryFailed Query couldn't be executed.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 503 Service Unavailable
 *     {
 *       "error": "QueryFailed"
 *     }
 */
  public getResponses = async (req: Request, res: Response): Promise<Response> => {
    try {
      const cardsResponse = await CardController.getResponses();
      return res.json(cardsResponse);
    } catch (err) {
      return res.status(503).json({ error: 'QueryFailed' });
    }
  }

  /**
 * @api {get} /cards/prompts Get Prompts
 * @apiName GetCardsPrompts
 * @apiGroup Cards
 *
 * @apiSuccess {Array} Cards
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              type: "Prompt",
 *              text: "Card's Prompt text",
 *              language: "en-us",
 *          }
 *     ]
 *
 * @apiError QueryFailed Query couldn't be executed.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 503 Service Unavailable
 *     {
 *       "error": "QueryFailed"
 *     }
 */
  public getPrompts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const cardsPrompt = await CardController.getPrompts();
      return res.json(cardsPrompt);
    } catch (err) {
      return res.status(503).json({ error: 'QueryFailed' });
    }
  }

  /**
 * @api {get} /cards/all Get all cards
 * @apiName GetCardsAll
 * @apiGroup Cards
 *
 * @apiSuccess {Object} CardsPromptResponse
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          responses: [
 *              {
 *                  type: "Response",
 *                  text: "Card's Response text",
 *                  language: "en-us",
 *              }
 *          ],
 *          prompts: [
 *              {
 *                  type: "Prompt",
 *                  text: "Card's Prompt text",
 *                  language: "en-us",
 *              }
 *          ]
 *     }
 *
 * @apiError QueryFailed Query couldn't be executed.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 503 Service Unavailable
 *     {
 *       "error": "QueryFailed"
 *     }
 */
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const cards = await CardController.getAll();
      return res.json(cards);
    } catch (err) {
      return res.status(503).json({ error: 'QueryFailed' });
    }
  }
}

export default new CardApiController();
