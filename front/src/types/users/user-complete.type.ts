import { Address } from "../addresses/address.type";
import { Review } from "../reviews/review.type";
import { Sale } from "../sales/sale.type";
import { User } from "./user.type";

export type CompleteUser = User & {
    events?: Event[]
    location?: Location[]    
    reviews?: Review[]
    sales?: Sale[]
}