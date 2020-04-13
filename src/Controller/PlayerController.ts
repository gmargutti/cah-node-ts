import GamesList from '../Model/GamesList';
import { CardInterface } from '../Schemas/Card';
import Player, { PlayerInterface } from '../Model/Players';

class PlayerController {
    public drawResponses = (gameId: string, playerId: string): CardInterface[] => {
      const game = GamesList.games.filter((g) => g.id === gameId)[0];
      const player = game.players.filter((p) => p.id === playerId)[0];
      const maxHandSize = Number(process.env.MAX_HAND_SIZE);
      for (let i = player.responses.length; i < maxHandSize; i += 1) {
        const randomCard = Math.floor(maxHandSize * Math.random());
        const drawedCard = game.cards.responses.splice(randomCard, 1)[0];
        player.responses.push(drawedCard);
      }
      return player.responses;
    }

    public drawPrompt = (gameId: string, playerId: string): CardInterface => {
      const game = GamesList.games.filter((g) => g.id === gameId)[0];
      const player = game.players.filter((p) => p.id === playerId)[0];
      const randomCard = Math.floor((Number(process.env.MAX_HAND_SIZE) * Math.random()));
      const drawedCard = game.cards.prompts.splice(randomCard, 1)[0];
      player.prompt = drawedCard;
      return drawedCard;
    }

    public joinGame = (gameId: string, playerName: string): PlayerInterface => {
      const game = GamesList.games.filter((g) => g.id === gameId)[0];
      if (!game) {
        const error = new Error('Game doesn\'t exist');
        error.name = 'GameNotFound';
        throw error;
      }
      const player = new Player(game, playerName);
      game.players.push(player);
      return player;
    }
}

export default new PlayerController();
