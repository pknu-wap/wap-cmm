import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatsGatewayService } from './chats.gateway.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatsGatewayService: ChatsGatewayService) {}

  afterInit(server: Server) {
    this.chatsGatewayService.onAfterInint(server);
  }

  handleConnection(client: Socket) {
    this.chatsGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.chatsGatewayService.onDisconnect(client);
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: {
      message: string;
    },
  ): void {
    this.chatsGatewayService.onMessage(client, payload);
  }
}
