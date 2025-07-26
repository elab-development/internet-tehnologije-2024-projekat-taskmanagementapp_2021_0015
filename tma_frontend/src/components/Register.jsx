import React, { useState } from 'react'
import logo from '../notes-icon.png'
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'

const Register = ({addUser, users}) => {
    const navigate = useNavigate();

    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password!==passwordConfirm){
            alert('Lozinke se ne poklapaju');
            return;
        }

        const maxId = users.length>0 ? Math.max(...users.map(u=>u.id)) : 0;
        const newId = maxId+1;

        const newUser = {
            id: newId,
            ime,
            prezime,
            username,
            password
        }

        addUser(newUser);
        alert('Uspesna registracija! Sada se prijavite');
        navigate('/');
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