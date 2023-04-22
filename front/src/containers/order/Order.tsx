import { useRecoilState } from "recoil"
import { basketAtom } from "../../atoms/basket.atom"
import BasketProduct from "../../components/basket/basket-product/BasketProduct"
import classes from './order.module.css'
import { Checkbox } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Alert }from '@mui/material'
import { useState } from "react"

const Order = () => {
    const [basket, setBasket] = useRecoilState(basketAtom)
    const navigate = useNavigate()

    const [displayAlert, setDisplayAlert] = useState<boolean>(false) 

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, sessionId: number) => {
        let priceDifference = basket.products.find(product => product.sessionId === sessionId)?.tickets.reduce((total, {pricePerTicket, nb}) => {
            return  total + pricePerTicket *nb
         }, 0)
        setBasket({...basket, products: basket.products.map(product => product.sessionId === sessionId ? {...product, checkOut: e.target.checked}: product), total: e.target.checked ? basket.total + (priceDifference ?? 0) : basket.total - (priceDifference ?? 0)})
        if(displayAlert){
            setDisplayAlert(false)
        }
    }

    const handleClick = () => {
        if(basket.products.some(product => product.checkOut)){
            navigate('personnal-info')
        } else {
            setDisplayAlert(true)
        }
    }

    const productsMap = basket.products?.map(product => (
        <div className={classes.product}>
            <div className={classes.tickets}>
                <BasketProduct key={product.sessionId} {...product}/>
            </div>
            <div className={classes.check}>
                <Checkbox color='secondary' size="medium" sx={{ '& .MuiSvgIcon-root': { fontSize: 40} }} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                handleCheck(e, product.sessionId)
            }} checked={product.checkOut} />
            </div>
        </div>
    ))
    return(
        <div className={classes.order}>
            <h3>Your Tickets</h3>
            <div >
                {productsMap}   
            </div>
            <div className={classes.actions}>
                <p>Total: {basket.total.toFixed(2)}€ </p>
                <div>
                    {displayAlert && <Alert severity="info">No items in check out!</Alert>}
                    <button onClick={handleClick}>Personnal info</button>
                </div>
            </div>
        </div>
    )
}

export default Order