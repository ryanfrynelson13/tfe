import axios from "axios"
import { useEffect } from "react"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { User } from "../../types/users/user.type"
import { getToken } from "../../utils/token.util"


const ProfilePage = () => {
    useEffect(() => {
        const token = getToken() 
            if(token){
                axios.get<User>(USERS_URLS.users, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(({data}) => {
                        setUser(data)
                    })
            }
    },[])
    return (
        <>
            
        </>
    )
}

export default ProfilePage