import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/core/models/entities/permission.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { UserType } from 'src/core/types/users/user.type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
        @InjectRepository(PermissionEntity) private permissionsRepo: Repository<PermissionEntity>
    ){}

    async register(user: UserType, permissionId: number) {

        const alreadyExists = await this.usersRepo.findOne({where: {email: user.email}})

        if(alreadyExists){
            throw new  BadRequestException('user already exists')
        }

        user.password = await bcrypt.hash(user.password, 4)
        const newUser = await this.usersRepo.create(user)

        const userPermission = await this.permissionsRepo.findOne({where: {id: permissionId}})

        newUser.permission = userPermission

        const registeredUser = await this.usersRepo.save(newUser)

        return registeredUser
    }
}
