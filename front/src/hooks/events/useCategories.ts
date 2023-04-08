import { useEffect, useState } from "react"
import { Category } from "../../types/categories/category.type"
import axios from "axios"
import { EVENT_URLS } from "../../enums/event-urls.enum"


export const useCategories = () => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getCategories()
    },[])
    let getCategories = async() => {
        try {
            const {data} = await axios.get<Category[]>(EVENT_URLS.categories)
            setLoading(false)
            setCategories(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
        
    }

    

    return {isLoading, categories, error}
    
}