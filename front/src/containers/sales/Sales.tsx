import { useEffect, useState } from "react"
import useSales from "../../hooks/users/useSales"
import { Sale as SaleType } from "../../types/sales/sale.type"
import Pagination from "../../components/pagination/Pagination"
import classes from './sales.module.css'
import * as dayjs from 'dayjs'
import usetickets from "../../hooks/events/useTickets"
import { Ticket } from "../../types/tickets/ticket.type"

const SaleTicket = ({session, ticketPrice}:Ticket) => (
    <div className={classes.ticket}>        
        <p className={classes.title}>{session?.event?.title}</p>
        <p>{ticketPrice?.title}</p>
        <p>{dayjs(session?.startTime).format('DD/MM/YY HH:mm').toString()}</p>
        <p>{ticketPrice?.pricePerTicket.toFixed(2)} €</p>
        <div className={classes.qr}>
            <img src="https://www.disabled-world.com/pics/1/dw-qr-code.png" alt="" />   
        </div>
    </div>
)

const Sale = ({sale}: {sale: SaleType}) => {

   
    const {isLoading, tickets} = usetickets(sale.id)
    
    const ticketsMap = tickets?.map((ticket: Ticket) => (
       <SaleTicket key={ticket.id} {...ticket} />
    ))
    
    return(
        <div className={classes.sale}>
            <div>
                <h3>Order number {sale.id}</h3>
                <h3>Your Tickets</h3>
            </div>
            <div>
                {
                    isLoading ? 
                    'Loading...':
                    ticketsMap
                }
            </div>
            <div>
                <p>Total: {sale.total.toFixed(2)}€</p>
            </div>
        </div>
    )
}

const Sales = () => {
    const {isLoading, sales} = useSales()

    const [page, setPage] = useState<number>(1)
    const [salesOnPage, setSalesOnPage] = useState<SaleType[]>([])


    useEffect(() => {
        if(sales){
            setSalesOnPage(sales?.slice(24 *( page -1), 24 * page))
        }
    }, [page, sales])


    const changePage = (page: number) => {
        setPage(page)
    }

    const salesMap = salesOnPage?.map(sale => (
        <Sale key={sale.id} sale={sale}/>
    ))

    return(
        <div>
            <div>
                {salesMap}
            </div>
            {sales && sales?.length > 1 && <Pagination onPage={changePage} count={sales?.length}/>}  
        </div>
    )
}

export default Sales