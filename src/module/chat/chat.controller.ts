import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController{
    constructor(private readonly chatService : ChatService){}
    @Get('')
    read(){
        return this.chatService.findAll();
    }
    @Post('')
    create(@Body() payload){
        return this.chatService.create(payload);
    }
    @Get(':id')
    readOne(@Param() params: any){
        return this.chatService.findOne(params.id)
    }
    
}