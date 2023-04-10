import { atom } from "recoil";
import { User } from "../types/users/user.type";

export const userAtom = atom<User | undefined>({
    key: 'user',
    default: undefined
})