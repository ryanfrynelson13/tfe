import { Address } from "../addresses/address.type";
import { LocationType } from "../locations/location.type";
import { Review } from "../reviews/review.type";
import { Sale } from "../sales/sale.type";
import { User } from "./user.type";

export type CompleteUser = User & {
    events?: Event[]
    locations?: LocationType[]    
    reviews?: Review[]
    sales?: Sale[]
}