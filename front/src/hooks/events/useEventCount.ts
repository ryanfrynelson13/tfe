import { useEffect, useState } from "react"
import axios from 'axios'
import { EVENT_URLS } from "../../enums/event-urls.enum"
import { useRecoilValue } from "recoil"
import { filtersAtom } from "../../atoms/filters.atom"

const useEventCount = () => {
    const [count, setCount] = useState<number>(0)
    const filters = useRecoilValue(filtersAtom)

    useEffect(() => {
        getEventCount()
    },[filters])
    let getEventCount = async() => {       
        const {data} = await axios.post<number>(EVENT_URLS.count,{
            ...filters
        })        
        setCount(data)
    }

    

    return count
}

export default useEventCount