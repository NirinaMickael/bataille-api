import { IsEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmpty({
        message:"empty username"
    })
    username:string;
}
