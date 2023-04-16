import { atom } from "recoil";

export const displayFilters = atom<boolean>({
    key: 'display filters',
    default: false
})