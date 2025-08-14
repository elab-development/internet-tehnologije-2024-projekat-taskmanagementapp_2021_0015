import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext';

const MotivationalQuote = () => {
    const {token} = useAuth();
    const [quote, setQuote] = useState(null);

    useEffect(()=>{
        const fetchQuote = async () => {
            try {
                const response = await axios.get("api/random-quote",{
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (Array.isArray(response.data)) {
                    setQuote(response.data[0]);
                } else {
                    setQuote(response.data);
                }
            } catch (error) {
                console.error("Greska pri ucitavanju citata",error);
            }
        }
        fetchQuote();
    },[token]);

    if(!quote) return (
        <div className='mq-container'>
            <p>Loading quote...</p>
        </div>
    ); 
    else return (
    <div className='mq-container'>
        <p>"{quote.q}"</p>
        <small>- {quote.a}</small>
    </div>
  )
}

export default MotivationalQuote