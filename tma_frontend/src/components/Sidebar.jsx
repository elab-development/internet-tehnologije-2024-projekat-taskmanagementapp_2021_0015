import React from 'react'
import Search from './Search'
import Filter from './Filter'
import '../css/Sidebar.css'

const Sidebar = (
    {searchTerm, setSearchTerm,
    status, priority, categories,
    filterStatus, filterPriority, filterCategory,
    setFilterStatus, setFilterPriority, setFilterCategory
    }
) => {
  return (
    <div className='sidebar'>
        <div className='search-and-filter'>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Filter status={status} priority={priority} categories={categories}
            filterStatus={filterStatus} filterPriority={filterPriority} filterCategory={filterCategory}
            setFilterStatus={setFilterStatus} setFilterPriority={setFilterPriority} setFilterCategory={setFilterCategory}/>
        </div>

    </div>
  )
}

export default Sidebar