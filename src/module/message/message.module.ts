import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {Message, MessageSchema} from './entities/message.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name:Message.name, schema: MessageSchema }])
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway]
})
export class MessageModule {}
