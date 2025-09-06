import React from 'react'
import List from './List'
import '../css/Lists.css'

const Lists = ({tasks, lists, order, onSave, onDelete, setTaskAsDone}) => {
  return (
    <div className='lists-container'>
        {lists.map((list)=> <List
                                key={list.id}
                                list={list}
                                tasks={tasks}
                                order={order}
                                onSave={onSave}
                                onDelete={onDelete}
                                setTaskAsDone={setTaskAsDone}
                            />)

        }
    </div>
  )
}

export default Lists