import { useState } from 'react'

export const useApi = () => {
    const [data,setData] = useState(null)
    const [error,setError] = useState()

    const fetchData = async (method, requestUrl) => {
        try{
            const requestOptions = {
                method: method
            }
            const result = await fetch(requestUrl,requestOptions)
            const jsonData = await result.json()
            setData(jsonData)
        } 
        catch(err) {
            setError(error)
        }
        return { data, error }
    }
    return { fetchData }
}