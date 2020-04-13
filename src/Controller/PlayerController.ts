import GamesList from '../Model/GamesList';
import { CardInterface } from '../Schemas/Card';
import Player, { PlayerInterface } from '../Model/Players';
import PlayersList from '../Model/PlayersList';

class PlayerController {
    public drawResponses = (playerId: string): CardInterface[] => {
      const player = PlayersList[playerId];
      if (!player) {
        const error = new Error('Player doesn\'t exist');
        error.name = 'PlayerNotFound';
        throw error;
      }
      const game = GamesList[player.gameId];
      const maxHandSize = Number(process.env.MAX_HAND_SIZE);
      for (let i = player.responses.length; i < maxHandSize; i += 1) {
        const randomCard = Math.floor(maxHandSize * Math.random());
        const drawedCard = game.cards.responses.splice(randomCard, 1)[0];
        player.responses.push(drawedCard);
      }
      return player.responses;
    }

    public drawPrompt = (playerId: string): CardInterface => {
      const player = PlayersList[playerId];
      if (!player) {
        const error = new Error('Player doesn\'t exist');
        error.name = 'PlayerNotFound';
        throw error;
      }
      const game = GamesList[player.gameId];
      const randomCard = Math.floor((Number(process.env.MAX_HAND_SIZE) * Math.random()));
      const drawedCard = game.cards.prompts.splice(randomCard, 1)[0];
      player.prompt = drawedCard;
      return drawedCard;
    }

    public joinGame = (gameId: string, playerName: string): PlayerInterface => {
      const game = GamesList[gameId];
      if (!game) {
        const error = new Error('Game doesn\'t exist');
        error.name = 'GameNotFound';
        throw error;
      }
      const player = new Player(game.id, playerName);
      GamesList[gameId].players[player.id] = player;
      PlayersList[player.id] = player;
      return player;
    }
}

export default new PlayerController();
