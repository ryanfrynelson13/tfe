import { IsInt, ValidateNested, } from "class-validator"
import { UserDto } from "./user.dto"
import { Type } from "class-transformer"


export class RegisterUser {
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto

    @IsInt()
    permissionId: number
}