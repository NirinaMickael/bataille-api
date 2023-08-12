import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {  InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './entities/message.entity';
import { Resp } from 'src/@utils/middleware/response.middleware';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';
import { Chat } from '../chat/entities/chat.entity';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel : Model<Message>){

  }
  async create(createMessageDto: CreateMessageDto) {
    try {
      const messageCreated = new this.messageModel(createMessageDto);
      return await messageCreated.save();
    } catch (error) {
      throw new HttpException(error.reason,500);
    }
  }

  async findAll() {
    try {
        let messageData = await this.messageModel.find().populate({
          path:'chat',
          select:'users'
        });
        if(messageData == null){
          throw new HttpException("message not found", 404);
        }
        return new Resp<Message[]>(messageData).response()
    } catch (error:any) {
        return new HttpException(error.reason, 500);
    }
  }

  async  findOne(id: string) {
    try {
      let messageData = await this.messageModel.findOne({_id:new Types.ObjectId(id)}).populate({
        path:'chat',
        select:'users'
      })
      if(messageData===null){
         throw new HttpException("id not found",HttpStatus.NOT_FOUND);
      }
      return new Resp<Message>(messageData).response()
  } catch (error:any) {
      console.log(error)
      return new HttpException(error.reason, 500);
  }
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
