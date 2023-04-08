import { Outlet } from "react-router-dom"
import Banner from "../../components/banner/Banner"


const AuthPage = () => {
    return(
        <>
            <Banner imageUrl="" title="Welcome To EventScene" />
            <Outlet />
        </>
    )
}

export default AuthPage