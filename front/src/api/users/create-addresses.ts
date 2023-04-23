import axios from "axios"
import { Address } from "../../types/addresses/address.type"
import { getToken } from "../../utils/token.util"
import { USERS_URLS } from "../../enums/users-urls.enum"


export const createAddress = async (body: Address) => {

    const token = getToken()
    const {data} = await axios.post<Address>(USERS_URLS.addresses, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}