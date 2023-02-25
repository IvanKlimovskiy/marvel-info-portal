import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback((url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)

        return fetch(url, {method, body, headers}
        )
            .then((res) => {
                if (res.ok) {
                    setLoading(false)
                    return res.json()
                } else {
                    setError(true)
                    setLoading(false)
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }, [])

    const clearError = useCallback(() => {
        setError(false)
    }, [])

    return {loading, error, request, clearError}
}