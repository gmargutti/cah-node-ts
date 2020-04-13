import { Request, Response } from 'express';
import PlayerController from '../Controller/PlayerController';

class PlayerApiController {
  public joinGame(req: Request, res: Response): Response {
    const { gameId } = req.params;
    const { playerId } = req.body.playerId;
    const player = PlayerController.joinGame(gameId, playerId);
    return res.json(player);
  }
}

export default new PlayerApiController();
