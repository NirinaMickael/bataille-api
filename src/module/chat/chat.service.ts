import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './entities/chat.entity';
import { HttpException } from '@nestjs/common';
import { Resp } from 'src/@utils/middleware/response.middleware';
@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name)private chatModel : Model<Chat> ){

  }
  async create(createChatDto: CreateChatDto) {
    try {
      const chatCreated = new this.chatModel(createChatDto);
      return await chatCreated.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let chatData = await this.chatModel.find(); 
      console.log(chatData);
        if(chatData==null){
          throw new HttpException("id not found",404);
        }
        return new Resp<Chat[]>(chatData).response()
    } catch (error) {
      throw  new HttpException(error.reason,500);;
    }
  }

  async findOne(id:string ) {
    try {
        let allData = await this.chatModel.find(); 
        let chatData = await this.chatModel.findById({id:id}); 
        console.log(chatData)
        if(chatData==null){
          throw new HttpException("id not found",404);
        }
        return new Resp<Chat>(chatData[0]).response()
    } catch (error:any) {
        throw new HttpException(error.reason,500);
    }
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
