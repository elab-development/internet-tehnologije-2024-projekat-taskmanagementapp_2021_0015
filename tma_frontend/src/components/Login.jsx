import React, { use, useState } from 'react'
import logo from '../notes-icon.png';
import {useAuth} from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showForgotModal, setShowForgotModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetToken, setResetToken] = useState("");

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
                <p onClick={()=>setShowForgotModal(true)}>Forgot password?</p>
            </form>
        </div>

        {showForgotModal && (
            <ForgotPassword
                onClose={()=>setShowForgotModal(false)}
                onTokenReceived={(email,token) => {
                    setResetEmail(email);
                    setResetToken(token);
                    setShowForgotModal(false);
                    setShowResetModal(true);
                }}
            />
        )}

        {showResetModal && (
            <ResetPassword
                email={resetEmail}
                token={resetToken}
                onClose={()=>setShowResetModal(false)}
                onResetSuccess={()=>{
                    setShowResetModal(false);
                    alert("Lozinka izmenjena. Mozete da se ulogujete")
                }}
            />
        )}
    </div>
  )
}

export default Login