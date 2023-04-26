import { useRecoilValue } from "recoil"
import { userAtom } from "../../atoms/user.atom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Banner from "../../components/banner/Banner"
import Sales from "../../containers/sales/Sales"


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
            <Banner imageUrl="" title="My Orders" />
            <Sales />
        </>
    )
}

export default SalesPage