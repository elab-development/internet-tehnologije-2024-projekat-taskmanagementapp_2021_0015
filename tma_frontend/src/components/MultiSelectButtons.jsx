import React from 'react'

const MultiSelectButtons = ({items, selected = [], onToggle}) => {
  return (
    <div className='task-buttons'>
        {items.map(val => {
            const isSelected = selected.includes(val.id);
            return (
                <button
                    key={val.id}
                    onClick={()=>onToggle(val.id)}
                    className={`btn-task ${isSelected ? 'active' : ''}`}
                >
                        {val.naziv}
                </button>
            );
        })}
    </div>
  )
}

export default MultiSelectButtons