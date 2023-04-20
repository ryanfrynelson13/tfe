import { useRecoilValue } from "recoil"
import { userAtom } from "../../atoms/user.atom"
import classes from './favorites.module.css'
import { EventType } from "../../types/events/event.type"
import EventCard from "../../components/event/event-card/EventCard"
import useFavorites from "../../hooks/favorites/useFavorites"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../../components/pagination/Pagination"

const Favorites = () => {

    const user = useRecoilValue(userAtom)
    const {isLoading, favorites} = useFavorites()
    const navigate = useNavigate()

    const [page, setPage] = useState<number>(1)
    const [favoritesOnPage, setFavoritesOnPage] = useState(favorites.slice(24 *( page -1), 24 * page))

    useEffect(() => {
        if(!user){
            navigate('/auth/login')
        }
    }, [user])

    useEffect(() => {
        setFavoritesOnPage(favorites.slice(24 *( page -1), 24 * page))
    }, [page, favorites])

    const changePage = (page: number) => {
        setPage(page)
    }

    const favoritesMap = favoritesOnPage?.map((event: EventType) => (
        <EventCard {...event} key={event.id}/>
    ))
    return(
        <>
            <div className={classes.grid}>
                {favoritesMap}
            </div>  
            {favorites?.length > 1 && <Pagination onPage={changePage} count={favorites.length}/>}  
        </>
    )
}

export default Favorites