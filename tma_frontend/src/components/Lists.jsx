import React from 'react'
import List from './List'
import '../css/Lists.css'

const Lists = ({tasks, lists, order, onSave, onDelete}) => {
  return (
    <div className='lists-container'>
        {lists.map((list)=> <List
                                key={list.id}
                                list={list}
                                tasks={tasks}
                                order={order}
                                onSave={onSave}
                                onDelete={onDelete}
                            />)

        }
    </div>
  )
}

export default Lists