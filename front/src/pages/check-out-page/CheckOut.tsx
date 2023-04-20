import { useRecoilValue } from "recoil"
import Banner from "../../components/banner/Banner"
import { userAtom } from "../../atoms/user.atom"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import classes from './check-out.module.css'

const CheckOut = () =>{

    const user = useRecoilValue(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
            navigate('/auth/login')
        }
    }, [])

    return(
        <>
            <Banner imageUrl="" title="Check Out"/>
            <div className={classes.box}>
                <Outlet />
            </div>
        </>
    )
}

export default CheckOut