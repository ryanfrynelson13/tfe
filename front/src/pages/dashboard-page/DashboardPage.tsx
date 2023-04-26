import { Outlet } from "react-router-dom"
import Banner from "../../components/banner/Banner"


const DashBoardPage = () => {

    return(
        <>
            <Banner imageUrl="" title="DashBoard"/>
            <Outlet />
        </>
    )
} 


export default DashBoardPage