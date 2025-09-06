import React from 'react'
import '../css/Pagination.css';

const Pagination = ({currentPage, totalItems, itemsPerPage, onPageChange}) => {
    const totalPages = Math.ceil(totalItems/itemsPerPage);
    if(totalPages<=1) return null;
    
    return (
        <div className='pagination'>
            {[...Array(totalPages).keys()].map(i => {
                const page = i+1;
                return (<button
                    key={page}
                    className={page === currentPage ? 'active-page' : ''}
                    onClick={()=>onPageChange(page)}>
                        {page}
                </button>
            )})}
        </div>
    )
}

export default Pagination