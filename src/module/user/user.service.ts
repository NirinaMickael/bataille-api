import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Resp } from 'src/@utils/middleware/response.middleware';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel : Model<User>){

  }
  async create(createuserDto: CreateUserDto) {
    try {
      const userCreated = new this.userModel(createuserDto);
      return await userCreated.save();
    } catch (error) {
      throw new HttpException(error.reason,500);
    }
  }

  async findAll() {
    try {
        let userData = await this.userModel.find()
        if(userData == null){
          throw new HttpException("user not found", 404);
        }
        return new Resp<User[]>(userData).response()
    } catch (error:any) {
        return new HttpException(error.reason, 500);
    }
  }

  async  findOne(id: string) {
    try {
      let userData = await this.userModel.findOne({_id:new Types.ObjectId(id)})
      if(userData===null){
         throw new HttpException("id not found",HttpStatus.NOT_FOUND);
      }
      return new Resp<User>(userData).response()
  } catch (error:any) {
      console.log(error)
      return new HttpException(error.reason, 500);
  }
  }

  async update(id: number, updateuserDto: UpdateUserDto) {
    try {
      let userData = await this.userModel.findByIdAndUpdate({_id:id},updateuserDto);
      if(userData===null){
         throw new HttpException("id not found",HttpStatus.NOT_FOUND);
      }
      return new Resp<User>(userData).response()
  } catch (error:any) {
      console.log(error)
      return new HttpException(error.reason, 500);
  }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
