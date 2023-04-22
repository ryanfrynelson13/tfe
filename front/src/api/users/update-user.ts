import axios from "axios";
import { User } from "../../types/users/user.type";
import { getToken } from "../../utils/token.util";
import { USERS_URLS } from "../../enums/users-urls.enum";


export const updateUser = async (body: Partial<User>) => {

    const token = getToken()
    const {data} = await axios.patch<User>(USERS_URLS.users, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}