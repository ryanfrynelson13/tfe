import { Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressUserEntity } from "src/core/models/entities/address-user.entity";
import { UserEntity } from "src/core/models/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class AddressesService{

    constructor(
        @InjectRepository(AddressUserEntity) private addressesRepo: Repository<AddressUserEntity>,
        @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>
    ){}
       
    async getCountries() {

        const res = await fetch('https://restcountries.com/v3.1/all?fields=name')

        let countriesList = await  res.json()

        countriesList = countriesList.sort((a, b) => a.name.common > b.name.common ? 1 : -1)

        countriesList = countriesList.map(country => country.name.common)

        return countriesList
    }

    async create(userId: number, address: AddressType){
        
        const newAddress = await this.addressesRepo.create(address)

        const user = await this.usersRepo.findOneBy({id: userId})

        if(!user){
            throw new NotFoundException
        }

        newAddress.user = user

        return this.addressesRepo.save(newAddress)
    }
       
}