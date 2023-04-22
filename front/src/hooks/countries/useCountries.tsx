import axios from "axios"
import { useEffect, useState } from "react"
import { USERS_URLS } from "../../enums/users-urls.enum"


const useCountries = () => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [countries, setCountries] = useState<string[] | null>(null)

    useEffect(() => {
        getCountries()
    }, [])

    const getCountries = async () => {
        const {data} = await axios.get<string[]>(USERS_URLS.countries)
        setCountries(data)
    }

    return {isLoading, countries}
}

export default useCountries