import { useState, useEffect } from 'react';

const userData = async ({ query }) => {
    const key = ''
    const url = 'https://api.weatherapi.com/v1'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/?key=${key}&q=${query}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    })
}

export default userData;