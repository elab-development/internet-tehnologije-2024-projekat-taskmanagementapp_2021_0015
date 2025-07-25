import React from 'react'

const Buttons = ({items, selected, setSelected, disabled=false}) => {
  return (
    <div className={`filter-buttons ${disabled ? 'disabled' : ''}`}>
        {items.map(val => (
            <button
                key={val}
                onClick={()=>setSelected(selected===val ? null : val)}
                className={`btn-filter ${selected === val ? 'active' : ''}`}
            >
                {val}
            </button>
        ))

        }
    </div>
  )
}

export default Buttons