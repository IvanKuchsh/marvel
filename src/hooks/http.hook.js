import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json(); 
            
            if (Object.keys(data).length === 0) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            } 

            setLoading(false);
            
            return data;
        } catch(e) {
            setError(e.message);
            setLoading(false);
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError}
}