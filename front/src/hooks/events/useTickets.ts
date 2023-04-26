import { useEffect, useState } from "react"
import { Ticket } from '../../types/tickets/ticket.type'
import axios from 'axios'
import {SALES_URLS} from '../../enums/sales-urls.enum'
import { getToken } from "../../utils/token.util"

const usetickets = (id: number) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [tickets, setTickets] = useState<Ticket[] | null>(null)

    useEffect(() => {
        getTickets()

        return () => {
            setLoading(true)
            setTickets(null)
        }
    }, [id])

    const getTickets = async () => {
        const token = getToken()
        const {data} = await axios.get<Ticket[]>(SALES_URLS.tickets + id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setLoading(false)
        setTickets(data)
    } 

    return {isLoading,tickets}
}

export default usetickets