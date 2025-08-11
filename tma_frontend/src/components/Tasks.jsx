import React from 'react'
import Task from './Task'
import '../css/Tasks.css'

const Tasks = ({tasks, categories, status, priority, onAdd, onUpdate, onDelete}) => {
  return (
    <div className='task-container'>
      
        {tasks.map((task) => <Task
                                key={task.id}
                                task={task}
                                category={categories}
                                status={status}
                                priority={priority}
                                onAdd={onAdd}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />)}

    </div>
  )
}

export default Tasks