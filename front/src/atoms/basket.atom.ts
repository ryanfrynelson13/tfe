import { atom } from "recoil";
import { BasketType } from "../types/basket/basket.type";


export const basketAtom = atom<BasketType>({
    key: 'basket',
    default: {
        products: [],
        checkOutTotal: 0,
        total: 0
    }
})