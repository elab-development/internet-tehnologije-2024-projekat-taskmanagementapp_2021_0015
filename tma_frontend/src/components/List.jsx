import React, {useState} from 'react'
import { CiSquareCheck } from "react-icons/ci";
import ListModalForm from './ListModalForm';

const List = ({list, tasks, order, onSave, onDelete, setTaskAsDone}) => {
    const [open, setOpen] = useState(false);

    const listOrder = order.filter(o => o.listaId === list.id);
    const listTasks = listOrder.map(o => tasks.find(t => t.id === o.zadatakId))

  return (
    <>
    <div className='list-card' onDoubleClick={()=>setOpen(true)}>
        <h3 className='list-title'>{list.naziv}</h3>
        {listTasks.map(t => (
            <p className={`list-item ${t.status === 'Zavrseno' ? 'done' : ''}`}>
                <CiSquareCheck size={20} onClick={()=>setTaskAsDone(t.id)}/>
                    {t.naziv}
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
            nextId={null}
        />
    )}
    </>
  )
}

export default List