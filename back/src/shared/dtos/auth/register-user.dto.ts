import { IsInt, IsObject, IsString } from "class-validator"
import { UserDto } from "./user.dto"


export class RegisterUser {
    @IsObject()
    user: UserDto

    @IsInt()
    permissionId: number
}