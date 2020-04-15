import { Server, Socket } from 'socket.io';
import PlayerEvents from './PlayerEvents';
import GamesList from '../Model/GamesList';
import PlayersList from '../Model/PlayersList';

class ConnectionEvent {
  public onConnect(socket: Socket, io: Server): void {
    console.log('user connected');

    const gameStateUpdated = (gameId: string): void => {
      const playersState: Record<string, object> = {};
      Object.keys(GamesList[gameId].players).forEach((pId) => {
        const player = PlayersList[pId];
        playersState[pId] = {
          id: player.id,
          gameId: player.gameId,
          name: player.name,
          score: player.score,
        };
      });
      io.emit('gameStateUpdated',
        {
          ...GamesList[gameId],
          players: playersState,
        });
    };

    socket.on('joinGame', (data) => {
      const { gameId, playerName } = data;
      const player = PlayerEvents.joinGame(gameId, playerName, socket);
      if (player) { gameStateUpdated(gameId); }
    });

    socket.on('drawResponses', (data) => {
      const { playerId } = data;
      PlayerEvents.drawResponses(playerId, socket);
    });

    socket.on('drawPrompt', (data) => {
      const { playerId } = data;
      PlayerEvents.drawPrompt(playerId, socket);
    });

    socket.on('addScore', (data) => {
      const { playerId } = data;
      const player = PlayerEvents.addScore(playerId, socket);
      if (player) { gameStateUpdated(player.gameId); }
    });

    socket.on('exitGame', (data) => {
      const { playerId } = data;
      const player = PlayerEvents.exitGame(playerId, socket);
      if (player) {
        gameStateUpdated(player.gameId);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }
}

export default new ConnectionEvent();
