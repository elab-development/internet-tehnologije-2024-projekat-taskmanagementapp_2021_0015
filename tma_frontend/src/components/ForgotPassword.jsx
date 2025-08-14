import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({onClose, onTokenReceived}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const response = await axios.post("api/password/forgot",{
            email: email
        });

        if(response.data.token){
            onTokenReceived(email,response.data.token);
        }else{
            setMessage(response.data.message || "Doslo je do greske");
        }
    }
  return (
    <div className='modal'>
        <div className='fp-container'>
        <form onSubmit={handleSubmit}>
            <h2>Zaboravljena sifra</h2>
            <input 
                className='input'
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <div className='buttons'>
                <button className='btn-send' type='submit'>Posalji reset link</button>
                <button className='btn-cancel' onClick={onclose}>Otkazi</button>
            </div>
            {message && <p>{message}</p>}
        </form>
        </div>
    </div>
  )
}

export default ForgotPassword