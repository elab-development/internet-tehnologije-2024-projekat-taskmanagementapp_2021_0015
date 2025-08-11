import React from 'react'
import Buttons from './Buttons'

const Filter = ({
    status, priority, categories,
    filterStatus, filterPriority, filterCategory,
    setFilterStatus, setFilterPriority, setFilterCategory
}) => {
  return (
    <div className='filter-container'>
        <div className='filters'>
            <div className='status'>
                <h2>Status</h2>
                <Buttons items={status} setSelected={setFilterStatus} selected={filterStatus}/>
            </div>
            <div className='priority'>
                <h2>Prioritet</h2>
                <Buttons items={priority} setSelected={setFilterPriority} selected={filterPriority}/>
            </div>
            <div className='kategorija'>
                <h2>Kategorija</h2>
                <Buttons 
                    items={categories.map(c => c.name)} 
                    setSelected={(naziv) => {
                        const chosenCategory = categories.find(c => c.name===naziv);
                        setFilterCategory(chosenCategory ? chosenCategory.id : null)
                    }} 
                    selected={categories.find(c => c.id === filterCategory)?.name || null}/>
            </div>
        </div>
    </div>
  )
}

export default Filter