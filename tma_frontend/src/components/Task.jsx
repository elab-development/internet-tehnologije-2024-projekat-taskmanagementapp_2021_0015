import React from 'react'
import '../css/Tasks.css'

const Task = ({task, category, status, priority}) => {
  return (
    <div className='task-card'>
        <div className='Task'>
            <h3 className='title'>{task.naziv}</h3>
            <p className='desc'>{task.opis}</p>
        </div>
    </div>
  )
}

export default Task