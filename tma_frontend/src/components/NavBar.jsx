import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../css/NavBar.css';
import {useAuth} from '../AuthContext';
import miniLogo from '../notes-icon.png';

const NavBar = ({type}) => {
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  if(type==='normal')
    return (
      <div className='NavBar'>
        <div className='app-title'>
          <img src={miniLogo} alt='Logo' width={35} height={35}/>
          <Link to='/tasks'><h1>TaskMaster</h1></Link>
        </div>
        <div className='pages'>
          <Link to='/lists'>Lists</Link>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    )

  if(type==='auth')
    return(
      <div className='NavBar'>
        <div className='app-title'>
          <img src={miniLogo} alt='Logo' width={35} height={35}/>
          <Link to='/tasks'><h1>TaskMaster</h1></Link>
        </div>
        <div className='pages'>
              <Link to='/register'>Register</Link>
        </div>
      </div>
    )
}

export default NavBar