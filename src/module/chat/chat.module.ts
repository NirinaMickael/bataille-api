import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entity';
import { ChatController } from './chat.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Chat.name,
        schema:ChatSchema
      }
    ])
  ],
  providers: [ChatGateway, ChatService],
  controllers:[ChatController]
})
export class ChatModule {}
