import axios from "axios"
import { useEffect } from "react"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { User } from "../../types/users/user.type"
import { getToken } from "../../utils/token.util"
import { useRecoilState} from "recoil"
import { userAtom } from "../../atoms/user.atom"
import { useNavigate } from "react-router-dom"
import { CompleteUser } from "../../types/users/user-complete.type"
import Banner from "../../components/banner/Banner"
import { getCompleteUser } from "../../api/users/get-complete-user"


const ProfilePage = () => {

    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        const token = getToken() 
            if(token){
                getCompleteUser(token)
                    .then((user) => {
                        setUser(user)
                    })
                    .catch((err) =>{
                        console.log(err)
                        navigate('/auth/login')
                    })
            } else{
                navigate('/auth/login')
            }
    },[])
    return (
        <>
            <Banner imageUrl="" title={user?.username ?? 'profile'} />            
        </>
    )
}

export default ProfilePage