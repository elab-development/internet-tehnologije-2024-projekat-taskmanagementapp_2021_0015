import React from 'react'
import {FaSearch} from 'react-icons/fa'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <input 
            type="text" 
            placeholder='Search' 
            id='search-bar' 
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <FaSearch />
    </div>
  )
}

export default Search