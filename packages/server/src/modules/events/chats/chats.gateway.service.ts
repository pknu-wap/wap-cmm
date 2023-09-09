import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ChatsGatewayService {
  private server: Server;

  constructor() {}

  onAfterInint(server: Server) {
    this.server = server;
    console.log('onAfterInint');
  }

  onConnection(client: Socket) {
    console.log('onConnection', client);
  }

  onDisconnect(client: Socket) {
    console.log('onDisconnect', client);
  }
}
