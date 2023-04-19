import { Addres } from "../addresses/adress.type";
import { User } from "./user.type";

export type CompleteUser = User & {
    events?: Event[]
    location?: Location[]
    addresses?: Addres[] 
}