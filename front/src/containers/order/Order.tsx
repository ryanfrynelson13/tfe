import { useRecoilState } from "recoil"
import { basketAtom } from "../../atoms/basket.atom"
import BasketProduct from "../../components/basket/basket-product/BasketProduct"
import classes from './order.module.css'

const Order = () => {
    const [basket, setBasket] = useRecoilState(basketAtom)

    const productsMap = basket.products?.map(product => (
        <BasketProduct key={product.sessionId} {...product}/>
    ))
    return(
        <div className={classes.order}>
            <h3>Your Tickets</h3>
            <div className={classes.tickets}>
                {productsMap}   
            </div>
            <div className={classes.actions}>
                <p>Total: {basket.total.toFixed(2)}€ </p>
                <div>
                    <button>Personnal info</button>
                </div>
            </div>
        </div>
    )
}

export default Order