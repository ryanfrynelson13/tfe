import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressUserEntity } from "src/core/models/entities/address-user.entity";
import { Repository } from "typeorm";


@Injectable()
export class AddressesService{

    constructor(
        @InjectRepository(AddressUserEntity) private categoriesRepo: Repository<AddressUserEntity>
    ){}
       
    async getCountries() {

        const res = await fetch('https://restcountries.com/v3.1/all?fields=name')

        let countriesList = await  res.json()

        countriesList = countriesList.sort((a, b) => a.name.common > b.name.common ? 1 : -1)

        countriesList = countriesList.map(country => country.name.common)

        return countriesList
    }
       
}