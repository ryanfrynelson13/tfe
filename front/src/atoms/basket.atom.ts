import { atom } from "recoil";
import { BasketType } from "../types/basket/basket.type";


export const basketAtom = atom<BasketType>({
    key: 'basket',
    default: {
        products: [],
        total: 0
    }
})