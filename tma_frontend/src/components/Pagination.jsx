import React from 'react'
import '../css/Pagination.css';

const Pagination = ({currentPage, totalItems, itemsPerPage, onPageChange}) => {
    const totalPages = Math.ceil(totalItems/itemsPerPage);
    if(totalPages<=1) return null;
    
    return (
        <div className='pagination'>
            {[...Array(totalPages).keys()].map(i => (
                <button
                    key={i}
                    className={i === currentPage ? 'active-page' : ''}
                    onClick={()=>onPageChange(i)}>
                        {i + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination