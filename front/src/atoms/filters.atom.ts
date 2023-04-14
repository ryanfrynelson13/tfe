import { atom } from "recoil";


export const filtersAtom = atom<Filters>({
    key: 'filters',
    default: {
        categories: [1,2,3,4,5,6,7,8,9,10],
        priceRange: [],
        lowestStars: 0
    }
})