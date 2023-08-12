import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  origin:'*'
})
export class MessageGateway implements OnGatewayConnection,OnGatewayInit,OnGatewayDisconnect {
  private readonly logger : Logger = new Logger("MessageGateway");
  constructor(private readonly messageService : MessageService ){

  }
  @SubscribeMessage("joinRoom")
  joinRoom(@ConnectedSocket() socket: Socket, roomId: string) {
    socket.join(roomId);
  }
  @SubscribeMessage('createChat')
  create(@ConnectedSocket() socket: Socket,@MessageBody() createMessageDto: CreateMessageDto) {
    socket.broadcast.emit('msgToClient',createMessageDto);
    return this.messageService.create(createMessageDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: string) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
  afterInit(server: any) {
      this.logger.log('Init')
  }
  handleConnection(client: any, ...args: any[]) {
      this.logger.log(`${client} is connected`);
  }
  handleDisconnect(client: any) {
      this.logger.log(`${client} is disconnected`);
  }

}
