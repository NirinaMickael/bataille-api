import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaType, Types ,Document } from "mongoose";


// export type ChatDocument = HydratedDocument<Chat>
@Schema()
export class Chat extends Document {
    @Prop({
        required:true,
        type:[Types.ObjectId]
    })
    users:string[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);