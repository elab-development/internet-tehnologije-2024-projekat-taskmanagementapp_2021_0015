import React from 'react'
import Task from './Task'
import '../css/Tasks.css'

const Tasks = ({tasks, categories, status, priority}) => {
  return (
    <div className='task-container'>
        {tasks.map((task) => <Task
                                key={task.id}
                                task={task}
                                category={categories}
                                status={status}
                                priority={priority}
                            />)}

    </div>
  )
}

export default Tasks