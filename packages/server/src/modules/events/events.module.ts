import { Module } from '@nestjs/common';

import { ChatsGateway } from './chats/chats.gateway';
import { ChatsGatewayService } from './chats/chats.gateway.service';

@Module({
  providers: [
    // chats
    ChatsGateway,
    ChatsGatewayService,
  ],
})
export class EventsModule {}
