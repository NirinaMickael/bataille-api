import { IsEmpty } from "class-validator"
import { MessageTypeENum } from "./messageType.enum"

export class CreateMessageDto {
@IsEmpty({
    message:"cant not empty"
})
sender:string
@IsEmpty({
    message:"cant not empty"
})
chat:string
@IsEmpty({
    message:"cant not empty"
})
content:string
@IsEmpty({
    message:"cant not empty"
})
type:MessageTypeENum
}
