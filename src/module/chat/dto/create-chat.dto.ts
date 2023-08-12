import { IsEmpty, Length } from "class-validator";

export class CreateChatDto {
    @IsEmpty({
        message:'cannot empty'
    })
    users:string[]
}
