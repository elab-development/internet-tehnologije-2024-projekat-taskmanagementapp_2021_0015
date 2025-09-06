import React, {useState} from 'react'
import { CiSquareCheck } from "react-icons/ci";
import ListModalForm from './ListModalForm';

const List = ({list, tasks, order, onSave, onDelete, setTaskAsDone}) => {
    const [open, setOpen] = useState(false);

    const listOrder = order.filter(o => o.task_list_id === list.id);
    const listTasks = listOrder.map(o => tasks.find(t => t.id === o.task_id));

  return (
    <>
    <div className='list-card' onDoubleClick={()=>setOpen(true)}>
        <h3 className='list-title'>{list.name}</h3>
        {listTasks.map(t => (
            <p key={t.id} className={`list-item ${t.status === 'Finished' ? 'done' : ''}`}>
                {<CiSquareCheck size={20} onClick={()=>setTaskAsDone(t)}/>}
                    {t.name}
            </p>
        ))}
    </div>

    {open && (
        <ListModalForm
            list={list}
            tasks={tasks}
            order={order}
            onSave={onSave}
            onDelete={onDelete}
            onClose={()=>setOpen(false)}
        />
    )}
    </>
  )
}

export default List