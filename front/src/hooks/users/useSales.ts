import { useEffect, useState } from "react"
import { Sale } from "../../types/sales/sale.type"
import { getToken } from "../../utils/token.util"
import axios from "axios"
import { SALES_URLS } from "../../enums/sales-urls.enum"


const useSales = () => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [sales, setSales] = useState<Sale[] | null>()

    useEffect(() => {
        getSales()

        return () => {
            setLoading(true)
            setSales(null)
            setError(null)
        }
    },[])
    let getSales = async() => {
        try {
            const token = getToken()
            const {data} = await axios.get<Sale[]>(SALES_URLS.user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLoading(false)
            setSales(data)            
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, sales, error}
}


export default useSales