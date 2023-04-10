import { atom } from "recoil";


export const basketAtom = atom({
    key: 'basket',
    default: {
        products: [],
        total: 0
    }
})