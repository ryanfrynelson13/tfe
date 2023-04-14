import axios from "axios"
import { useEffect, useState } from "react"
import { EVENT_URLS } from "../../enums/event-urls.enum"


const usePriceRange = () => {

    const [range, setRange] = useState<[number, number]>([0,0])
    useEffect(() => {
        getPriceRange()
    },[])

    const getPriceRange = async () => {
        const{data} = await axios.get<[number, number]>(EVENT_URLS.priceRange)

        setRange(data)
    }

    return range
}

export default usePriceRange