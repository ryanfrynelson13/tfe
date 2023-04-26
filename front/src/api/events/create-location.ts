import axios from "axios";
import { LocationType } from "../../types/locations/location.type";
import { getToken } from "../../utils/token.util";
import { USERS_URLS } from "../../enums/users-urls.enum";

export const createLocation =async (body: LocationType) => {

    const token = getToken()
    const {data} = await axios.post<LocationType>(USERS_URLS.locations, body,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  )

    return data
}