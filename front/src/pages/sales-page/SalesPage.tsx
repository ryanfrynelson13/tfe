import { useRecoilValue } from "recoil"
import { userAtom } from "../../atoms/user.atom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const SalesPage = () => {

    const user = useRecoilValue(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
            navigate('/auth/login')
        }   
    })

    return(
        <>
            <h1>Sales</h1>
        </>
    )
}

export default SalesPage