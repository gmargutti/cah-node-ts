import { Request, Response } from 'express';
import PlayerController from '../Controller/PlayerController';

class PlayerApiController {
  /**
 * @api {post} /players/join Join Game
 * @apiName JoinGame
 * @apiGroup Player
 *
 * @apiSuccess {Object} Player
 *
 * @apiParamExample {json} Request-Example:
 * {
 *      "gameId": "626b1943-0804-49a7-84de-af9b8af83c66",
 *      "playerName": "Player Name"
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "id": "d9089d2f-1665-4590-bf1c-604b44a363d7",
 *          "gameId": "626b1943-0804-49a7-84de-af9b8af83c66",
 *          "name": "Player Name",
 *          "prompt": {...PromptCard},
 *          "responses": [...ResponseCards],
 *          "score": 0
 *     }
 *
 * @apiError PlayerNotFound There is no player with given ID.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "PlayerNotFound"
 *     }
 *
 */
  public joinGame(req: Request, res: Response): Response {
    try {
      const { playerName, gameId } = req.body;
      const player = PlayerController.joinGame(gameId, playerName);
      return res.json(player);
    } catch (err) {
      if (err.name === 'GameNotFound') {
        return res.status(404).json({ message: `${err.name}: ${err.message}` });
      }
      return res.status(500).json({ message: 'Unkown Error' });
    }
  }
}

export default new PlayerApiController();
