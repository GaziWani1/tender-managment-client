import {useState, useEffect, useCallback} from "react";
import { serverUrl } from "../constants";

export const fetchAPI = async (url , options) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    try {
        const response = await fetch(serverUrl+url, {...options,
            headers :{
                ...options.headers,
                Authorization:`Bearer ${token}`
            }
        });
        if (!response.ok) {
            new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error.message);
        throw error;
    }
};

export const useFetch = (url , options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAPI(url, options);
            setData(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, []);

    return {data, loading, error, fetchData};
};