import Footer from "../footer/Footer"
import Header from "../header/Header"
import classes from './layout.module.css'
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { userAtom } from "../../atoms/user.atom"
import axios from "axios"
import { USERS_URLS } from "../../enums/users-urls.enum"
import { User } from "../../types/users/user.type"
import Filters from "../filters/Filters"
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { filtersAtom } from "../../atoms/filters.atom"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {

    const [user, setUser] = useRecoilState(userAtom)
    const setFilters = useSetRecoilState(filtersAtom)
    
    useEffect(() => {
        if(!user){
            const token = localStorage.getItem('access_token')
            if(token){
                const bearer = JSON.parse(token)
                axios.get<User>(USERS_URLS.users, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    }
                })
                    .then(({data}) => {
                        setUser(data)
                    })
            }
        }
    }) 
    
    useEffect(() => {
        axios.get<[number, number]>(EVENT_URLS.priceRange)
            .then(({data}) => setFilters(filters => ({...filters, priceRange: data})))
    },[])

    

    return(
        <div className={classes.layout}>
            <Filters/>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout