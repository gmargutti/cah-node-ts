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
  public async newGame(_req: Request, res: Response): Promise<Response> {
    const game = await GameController.newGame();
    return res.json(game);
  }

  /**
 * @api {delete} /games Delete Existing Game
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
  public async endGame(req: Request, res: Response): Promise<Response> {
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
}

export default new GameApiController();
