import React, { use, useState } from 'react'
import logo from '../notes-icon.png';
import {useAuth} from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const found = await login(username, password);

        if(found){
            navigate('/tasks');
        }else {
            alert('Pogresno korisnicko ime ili lozinka');
        }
    }

  return (
    <div className='form-container'>
        <div className='logo'>
            <img src={logo} alt='Logo' width={300} height={300}/>
        </div>
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <input 
                    className='input'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    className='input'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='btn-login' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login