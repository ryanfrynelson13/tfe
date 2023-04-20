import { atom } from "recoil";
import { CompleteUser } from "../types/users/user-complete.type";

export const userAtom = atom<CompleteUser |undefined>({
    key: 'user',
    default: undefined
})