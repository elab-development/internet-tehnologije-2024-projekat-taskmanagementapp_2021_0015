import axios from 'axios';
import React, { useState } from 'react'

const ResetPassword = ({email, token, onClose, onResetSuccess}) => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if(password!==passwordConfirm){
            alert('Lozinke se ne poklapaju');
            return;
        }

        const response = await axios.post("api/password/reset",{
            email: email,
            token: token,
            password: password,
            password_confirmation: passwordConfirm
        });

        if(response.data.message.toLowerCase().includes("success")){
            onResetSuccess();
        }else{
            setMessage(response.data.message || "Doslo je do greske");
        }
    }
  return (
    <div className='modal'>
        <div className='rp-container'>
        <form onSubmit={handleSubmit}>
            <h2>Unesite novu lozinku</h2>
            <input 
                className='input'
                type="password" 
                placeholder='Nova lozinka'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <input 
                className='input'
                type="password" 
                placeholder='Potvrda lozinke'
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
            />
            <div className='buttons'>
                <button className='btn-send' type='submit'>Sacuvaj</button>
                <button className='btn-cancel' onClick={onClose}>Otkazi</button>
            </div>
        </form>
        {message && <p>{message}</p>}
        </div>
    </div>
  )
}

export default ResetPassword