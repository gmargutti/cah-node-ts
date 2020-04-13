import { Request, Response } from 'express';
import GameController from '../Controller/GameController';

class GameApiController {
  /**
 * @api {post} /games Create new Game
 * @apiName PostGames
 * @apiGroup Games
 *
 * @apiSuccess {Object} Game
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          id: '1a5F5-1C8hY-9zZL45',
 *          cards: { responses: [{...}], prompts: [{...}] },
 *          players: [{...}]
 *     }
 */
  public newGame = async (_req: Request, res: Response): Promise<Response> => {
    const game = await GameController.newGame();
    return res.json(game);
  }

  /**
 * @api {delete} /games/:id Delete Existing Game
 * @apiName DeleteGames
 * @apiGroup Games
 *
 * @apiSuccess {Object} DeletedGame
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          id: '1a5F5-1C8hY-9zZL45',
 *          cards: { responses: [{...}], prompts: [{...}] },
 *          players: [{...}]
 *     }
 *
 * @apiError GameNotFound There is no game with given ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "GameNotFound"
 *     }
 */
  public endGame = async (req: Request, res: Response): Promise<Response> => {
    try {
      const game = GameController.endGame(req.params.id);
      return res.json(game);
    } catch (err) {
      if (err.name === 'GameNotFound') {
        return res.status(404).json({ error: 'GameNotFound' });
      }
      return res.status(500).json({ error: 'UnkownError' });
    }
  }

  /**
 * @api {get} /games Get all games
 * @apiName GetGames
 * @apiGroup Games
 *
 * @apiSuccess {Array} Games
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          id: '1a5F5-1C8hY-9zZL45',
 *          cards: { responses: [{...}], prompts: [{...}] },
 *          players: [{...}]
 *     ]
 */
  public getGames = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const games = GameController.getGames();
      return res.json(games);
    } catch (err) {
      return res.status(500).json({ error: 'UnknownError' });
    }
  }

  /**
 * @api {get} /games/:id Get Game by ID
 * @apiName GetGamesById
 * @apiGroup Games
 *
 * @apiSuccess {Object} Game
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          id: '1a5F5-1C8hY-9zZL45',
 *          cards: { responses: [{...}], prompts: [{...}] },
 *          players: [{...}]
 *     }
 *
 * @apiError GameNotFound There is no game with given ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "GameNotFound"
 *     }
 */
  public getGame = (req: Request, res: Response): Response => {
    try {
      const game = GameController.getGame(req.params.id);
      return res.json(game);
    } catch (err) {
      if (err.name === 'GameNotFound') {
        return res.status(404).json({ error: 'GameNotFound' });
      }
      return res.status(500).json({ error: 'Unknown Error' });
    }
  }
}

export default new GameApiController();
