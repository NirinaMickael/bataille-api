import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types ,Document} from "mongoose";
import { MessageTypeENum } from "../dto/messageType.enum";
import { Chat } from "src/module/chat/entities/chat.entity";

@Schema()
export class Message extends Document {
    @Prop({
        required:true,
        type:Types.ObjectId,
    })
    sender:string
    @Prop({
        required:true,
        type:Types.ObjectId,
        ref:Chat.name
    })
    chat:string
    @Prop({
        required:true,
        type:String,
        maxlength:10
    })
    content:string
    @Prop({
        required:true,
        type:String
    })
    type:String
}
export const MessageSchema = SchemaFactory.createForClass(Message);
// MessageSchema.set('timestamps',true)
// export default MessageSchema;