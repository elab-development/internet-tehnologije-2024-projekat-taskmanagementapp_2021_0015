import React, { useState } from 'react'
import '../css/Tasks.css'
import TaskModalForm from './TaskModalForm';

const Task = ({task, category, status, priority, onAdd, onUpdate, onDelete}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className='task-card' onClick={()=>{setOpen(true)}}>
        <div className='Task'>
            <h3 className='title'>{task.name}</h3>
            <p className='desc'>{task.description}</p>
        </div>
    </div>

    {open && (
      <TaskModalForm
        initialData={task}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onClose={()=>setOpen(false)}
        onDelete={onDelete}
        categories={category}
        status={status}
        priority={priority}
      />
    )}
    </>
  )
}

export default Task