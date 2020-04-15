import { Socket } from 'socket.io';
import PlayerController from '../Controller/PlayerController';
import PlayersList from '../Model/PlayersList';
import { PlayerInterface } from '../Model/Players';

class PlayerEvents {
  public joinGame(gameId: string, playerName: string, socket: Socket): PlayerInterface | null {
    try {
      const player = PlayerController.joinGame(gameId, playerName);
      socket.emit('playerStateUpdated', player);
      return player;
    } catch (error) {
      socket.emit('teste', error);
    }
    return null;
  }

  public drawResponses(playerId: string, socket: Socket): PlayerInterface | null {
    try {
      const player = PlayerController.drawResponses(playerId);
      socket.emit('playerStateUpdated', PlayersList[playerId]);
      return player;
    } catch (error) {
      socket.emit('teste', error);
    }
    return null;
  }

  public drawPrompt(playerId: string, socket: Socket): PlayerInterface | null {
    try {
      const player = PlayerController.drawPrompt(playerId);
      socket.emit('playerStateUpdated', PlayersList[playerId]);
      return player;
    } catch (error) {
      socket.emit('teste', error);
    }
    return null;
  }

  public addScore(playerId: string, socket: Socket): PlayerInterface | null {
    try {
      const player = PlayerController.addScore(playerId);
      socket.emit('playerStateUpdated', player);
      return player;
    } catch (error) {
      socket.emit('teste', error);
    }
    return null;
  }

  public exitGame(playerId: string, socket: Socket): PlayerInterface | null {
    try {
      const player = PlayersList[playerId];
      PlayerController.exitGame(playerId);
      return player;
    } catch (error) {
      socket.emit('teste', error);
    }
    return null;
  }
}

export default new PlayerEvents();
