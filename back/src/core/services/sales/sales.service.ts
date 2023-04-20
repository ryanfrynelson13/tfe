import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from 'src/core/models/entities/sale.entity';
import { UserEntity } from 'src/core/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService{

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        @InjectRepository(SaleEntity) private saleRepo: Repository<SaleEntity>,
    ){}

    async updateSale () {
        const sales = await this.saleRepo.find({})
        let users = await this.userRepo.find({relations: {permission: true}})

        users = users.filter(user => user.permission.id === 3)

        for(const sale of sales){

            sale.user = users[Math.floor(Math.random() * users.length)]

            await this.saleRepo.save(sale)
        }

        return 'done'
    }
}