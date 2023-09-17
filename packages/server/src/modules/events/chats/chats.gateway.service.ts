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
    console.log('onConnection', client.id);
  }

  onDisconnect(client: Socket) {
    console.log('onDisconnect', client.id);
  }

  onMessage(
    client: Socket,
    payload: {
      message: string;
    },
  ) {
    this.server.emit('message', `${client.id} ${payload}`); // .emit은 모든 클라이언트에게 보내는 것
  }
}
