import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext';
import '../css/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = ({onUpdate}) => {
    const {currentUser} = useAuth();
    const isVerified = currentUser?.is_verified;
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        is_verified: false
    })

    useEffect(() => {
        if(currentUser){
            setUserData({
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                email: currentUser.email,
                username: currentUser.username,
                is_verified: currentUser.is_verified
            });
        }
    }, [currentUser]);

    const handleVerify = () => {
        if(!isVerified){
            const updatedData = {...userData, is_verified:true}
            setUserData(updatedData)
            onUpdate(updatedData);
            alert('Nalog je uspesno verifikovan. Molimo ulogujte se ponovo!');
            navigate('/');
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSave = async () => {
        if(!emailRegex.test(userData.email)){
            alert('Unesite validan email');
            return;
        }
        onUpdate(userData);
        setIsEditing(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

  return (
    <div className='profile-container'>
        <div className='profile-form'>
            <input 
                className='input'
                type='text'
                placeholder='Ime'
                value={userData.first_name}
                onChange={e => setUserData({...userData, first_name:e.target.value})}
                disabled={!isEditing}
            />
            <input 
                className='input'
                type='text'
                placeholder='Prezime'
                value={userData.last_name}
                onChange={e => setUserData({...userData, last_name:e.target.value})}
                disabled={!isEditing}
            />
            <input
                className='input'
                type='email'
                placeholder='Email'
                value={userData.email}
                onChange={e => setUserData({...userData, email:e.target.value})}
                disabled={!isEditing}
            />
            <input 
                className='input'
                type='text'
                placeholder='Username'
                value={userData.username}
                onChange={e => setUserData({...userData, username:e.target.value})}
                disabled={!isEditing}
            />
            <div className='profile-buttons'>
                <button className={`btn-verify ${isVerified ? 'disabled' : ''}`} onClick={handleVerify}>
                    Verifikuj nalog
                </button>
                {isEditing ? (
                    <button className='btn-edit' onClick={handleSave}>
                        Sačuvaj
                    </button>
                ) : (
                    <button className='btn-edit' onClick={handleEdit}>
                        Izmeni
                    </button>
                )}
            </div>
                
        </div>
    </div>
  )
}

export default Profile