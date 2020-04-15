import http from 'http';
import socketio from 'socket.io';
import app from './app';
import ConnectionEvent from '../src/Events/ConnectionEvent';

const httpServer = http.createServer(app);

const io = socketio(httpServer);

io.on('connection', ((socket) => ConnectionEvent.onConnect(socket, io)));

httpServer.listen(process.env.PORT || 3333);
