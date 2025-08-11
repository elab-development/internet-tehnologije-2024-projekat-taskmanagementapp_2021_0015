import React, { useState } from 'react'
import logo from '../notes-icon.png'
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameRegex = /^[A-Z][a-z]+$/;

        if(!nameRegex.test(ime)){
            alert('Ime mora pocinjati velikim slovom i sadrzati samo slova');
            return;
        }

        if(!nameRegex.test(prezime)){
            alert('Prezime mora pocinjati velikim slovom i sadrzati samo slova');
            return;
        }

        if(password!==passwordConfirm){
            alert('Lozinke se ne poklapaju');
            return;
        }

        const response = await axios.post("api/register", {
            first_name: ime, 
            last_name: prezime,
            username,
            password
        });

        if(response.data.success === true){
            alert('Uspesna registracija! Sada se prijavite');
            navigate('/');
        }
    }

  return (
    <div className='register-container'>
      <div className='logo'>
            <img src={logo} alt="Logo" width={200} height={200}/>
        </div>
        <div className='register-form'>
            <form onSubmit={handleSubmit}>
                <input 
                    className='input'
                    type='text'
                    placeholder='Ime'
                    value={ime}
                    onChange={e => setIme(e.target.value)}
                    required
                />
                <input 
                    className='input'
                    type='text'
                    placeholder='Prezime'
                    value={prezime}
                    onChange={e => setPrezime(e.target.value)}
                    required
                />
                <input 
                    className='input'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input 
                    className='input'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input 
                    className='input'
                    type='password'
                    placeholder='Confirm password'
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    required
                />
                <button className='btn-register' type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register