import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/core/models/entities/Event.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { UserType } from 'src/core/types/users/user.type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>
    ){}

    async getOneUser(userId: number){
        const user = await this.usersRepo.findOne({where: {id: userId}, relations:{
            favorites: true,
            permission: true
        }})

        if(!user){
            throw new NotFoundException('user not found')
        }

        return user
    }

    async updateUser(id: number, user: Partial<UserType>){
        const userToUpdate = await this.usersRepo.findOneBy({id: id})

        if(!userToUpdate){
            throw new NotFoundException('user not found')
        }

        if(user.password){
            user.password = await bcrypt.hash(user.password, 4)
        }

        const updatedUser = Object.assign(userToUpdate, user)

        return this.usersRepo.save(updatedUser)
    }
    
}
