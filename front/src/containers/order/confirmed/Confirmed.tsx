import { useLocation } from "react-router-dom"


const Confirmed = () => {

   const {state} = useLocation()
   const {sale} = state 

   
    
    return(
        <>
            Sale
        </>
    )
}

export default Confirmed