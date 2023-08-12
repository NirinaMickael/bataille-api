import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './module/chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './module/chat/entities/chat.entity';
import { MessageModule } from './module/message/message.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ChatModule,
    MessageModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load:[configuration]
    }),
    MongooseModule.forRootAsync({
      useFactory :async (configurationService:ConfigService)=>(
      {
        uri:configurationService.get("development.uri"),
      }),
      inject:[ConfigService]
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
