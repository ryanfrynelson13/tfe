import { Controller, Patch, Body, Get, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { UsersService } from '../../../core/services/users/users.service';
import { AuthGard } from 'src/core/guards/auth.guard';
import { UpdateUserDto } from 'src/core/dtos/users/update-user.dto';


@UseGuards(AuthGard)
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUser(
        @Request() req){
        const userId: number = req.user.id
        return this.usersService.getOneUser(userId)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    getProfile(
        @Request() req){
        const userId: number = req.user.id
        return this.usersService.getProfile(userId)
    }

    @Patch()
    updateUser(
        @Request() req,
        @Body() user: UpdateUserDto
    ){
        const id: number = req.user.id
        return this.usersService.updateUser(id, user)
    }
   
}
