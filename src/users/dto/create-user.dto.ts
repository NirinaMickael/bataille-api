import { IsNotEmpty, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:"the username cannot empty"})
    @Length(1,7,{message:"the username must be in range(1,7) "})
    username : string;
    @IsNotEmpty({message:"the password cannot empty"})

    @IsStrongPassword({minLength:6,minSymbols:2},{message:"your password is not strong,1 symbol,1 number and more than 6 charactere is required"})
    password:string
}

