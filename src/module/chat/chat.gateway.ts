import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({
  cors:{
    origin:"*"
  }
})
export class ChatGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  private logger : Logger = new Logger("AppGateway");
  @WebSocketServer() server : Server;
  constructor(private readonly chatService: ChatService) {}
  @SubscribeMessage("joinRoom")
  joinRoom(@ConnectedSocket() socket: Socket, roomId: string) {
    socket.join(roomId);
  }
  @SubscribeMessage('createChat')
  create(@ConnectedSocket() socket: Socket,@MessageBody() createChatDto: CreateChatDto) {
    socket.broadcast.emit('msgToClient',createChatDto);
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: string) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
  afterInit(server: any) {
      this.logger.log("Init")
  }
  handleConnection(client: any, ...args: any[]) {
      console.log("connected");
  }
  handleDisconnect(client: any) {
      console.log("clietn disconnet")
  }
}
