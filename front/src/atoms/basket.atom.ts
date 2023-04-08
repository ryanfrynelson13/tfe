import { atom } from "recoil";


const basketAtom = atom({
    key: 'basket',
    default: {
        products: [],
        total: 0
    }
})