import { useEffect, useState } from "react"
import { Category } from "../../types/categories/category.type"
import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"


export const useCategory = (id: string) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [category, setCategory] = useState<Category| null>(null)

    useEffect(() => {
        getCategory()
    },[])
    let getCategory = async() => {
        try {
            const {data} = await axios.get<Category>(EVENT_URLS.categories + id)
            setLoading(false)
            setCategory(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, category, error}
    
}