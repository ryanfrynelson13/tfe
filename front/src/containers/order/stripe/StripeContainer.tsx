import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { SALES_URLS } from "../../../enums/sales-urls.enum";
import axios from "axios";
import { getToken } from "../../../utils/token.util";
import { useRecoilState, useRecoilValue } from "recoil";
import { basketAtom } from "../../../atoms/basket.atom";
import './stripe.css'
import { useNavigate } from "react-router-dom";
import { createSale } from "../../../api/sales/create-sale";



const StripeContainer = () =>{

    const {checkOutTotal} = useRecoilValue(basketAtom)
    console.log(checkOutTotal)

    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    useEffect(() => {
        const token = getToken()
        axios.get(SALES_URLS.pk, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({data}) => {
                setStripePromise(loadStripe(data))
            } )
    }, [])

    useEffect(() => {
        const token = getToken()
        axios.post(SALES_URLS.sk, {
            amount: checkOutTotal
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({data}) => {
                setClientSecret(data)
                console.log(data)
            })
    }, [])
    
    return(
        <div className="stripe">
            {
                stripePromise && clientSecret && 
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm />
                </Elements>
            }
        </div>
    )
}

export default StripeContainer



const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const [basket, setBasket] = useRecoilState(basketAtom)

    const [isProccessing, setIsProccessing] = useState<boolean>(false)

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if( !stripe ||  !elements){
            return
        }

        setIsProccessing(true)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
            },
            redirect: 'if_required'
        })

        if(error){
            console.log(error)
        } else{
            const sale = await createSale(basket)         
   
            let tempProducts = [...basket.products.filter(product => !product.checkOut)]

            tempProducts = tempProducts.map(product => ({...product, checkOut: true}))

            const newTotal = basket.total - basket.checkOutTotal /100

            setBasket({...basket, checkOutTotal: 0, total: newTotal, products: tempProducts})
        
            navigate('/check-out/confirmed', {state: {sale}})
        }

        setIsProccessing(false)
    }

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={isProccessing}>{isProccessing? 'Proccessing...' : 'Pay'}</button>
      </form>
    );
};
