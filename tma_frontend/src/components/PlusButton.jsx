import React from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";

const PlusButton = ({isOpen, onClick}) => {
  return (
    <div className='plus-btn' onClick={onClick}>
         {isOpen ? <FaMinus/> : <FaPlus/>}
    </div>
  )
}

export default PlusButton