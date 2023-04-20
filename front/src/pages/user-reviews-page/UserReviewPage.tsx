import { useRecoilState } from "recoil"
import Banner from "../../components/banner/Banner"
import { userAtom } from "../../atoms/user.atom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getToken } from "../../utils/token.util"
import { getCompleteUser } from "../../api/users/get-complete-user"
import UserReviews from "../../containers/user-reviews/UserReviews"


const UserReviewsPage = () => {

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

    return(
        <>
            <Banner imageUrl="" title="Reviews" />
            <UserReviews />
        </>
    )
}

export default UserReviewsPage