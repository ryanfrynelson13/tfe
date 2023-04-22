import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(                       'pk_test_51MzIgYI9sITww6vWnJKctYQw3O2gUPB7K2AZiY0kkxqK3TvbtCbiq2bsujoUHozhOxpehUQSHuTwkXqDYTwZXs4R00auUuJ3wV'
)

const StripeContainer = () =>{

    const options = {
        clientSecret: 'sk_test_51MzIgYI9sITww6vWCD5Hxvux2PLONuy8jXWGOEy1z1JXHWdpEx9ZUO6T3Wef90FxTKywPBbJdcbDLXBByryNpQlv00CE8P8WOb',
    };
    
    return(
        <div>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default StripeContainer



const CheckoutForm = () => {
    return (
      <form>
        <PaymentElement />
        <button>Submit</button>
      </form>
    );
};
