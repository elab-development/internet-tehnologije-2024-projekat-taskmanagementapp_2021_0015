import React from 'react'
import {Link} from 'react-router-dom'
import '../css/NavBar.css';

const NavBar = () => {
  return (
    <div className='NavBar'>
        <Link to='/tasks'><h1>TaskMaster</h1></Link>
        <div className='pages'>
            <Link to='/lists'>Lists</Link>
        </div>
    </div>
  )
}

export default NavBar