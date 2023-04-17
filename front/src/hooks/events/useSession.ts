import { useEffect, useState } from "react"
import { Session } from "../../types/sessions/session.type"
import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"


const useSession = (id: number) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        getSession()
    },[])
    
    let getSession = async() => {
        try {
            const {data} = await axios.get<Session>(EVENT_URLS.sessions + id)
            setLoading(false)
            setSession(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, session, error}
}

export default useSession