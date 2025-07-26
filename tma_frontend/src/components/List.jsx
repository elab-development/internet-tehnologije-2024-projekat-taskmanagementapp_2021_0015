import React, {useState} from 'react'
import { CiSquareCheck } from "react-icons/ci";
import ListModalForm from './ListModalForm';

const List = ({list, tasks, order, onSave, onDelete}) => {
    const [open, setOpen] = useState(false);

    const listOrder = order.filter(o => o.listaId === list.id);
    const listTasks = listOrder.map(o => tasks.find(t => t.id === o.zadatakId))

  return (
    <>
    <div className='list-card' onClick={()=>setOpen(true)}>
        <h3 className='list-title'>{list.naziv}</h3>
        {listTasks.map(t => (
            <p className='list-item'><CiSquareCheck size={20}/>{t.naziv}</p>
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
            nextId={null}
        />
    )}
    </>
  )
}

export default List