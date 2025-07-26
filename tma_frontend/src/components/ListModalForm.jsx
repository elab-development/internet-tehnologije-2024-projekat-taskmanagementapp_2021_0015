import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import MultiSelectButtons from './MultiSelectButtons';
import '../css/ListModalForm.css';

const ListModalForm = ({list=null, tasks, order, onSave, onDelete, onClose, nextId}) => {
    const isEditing = list!==null;
    const [listData, setListData] = useState(
        list || {id: nextId(), naziv: ''}
    )
    const [chosenTasks, setChosenTasks] = useState([]);
    const [taskOrder, setTaskOrder] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [tempTasks, setTempTasks] = useState([]);
    
    useEffect(()=>{
        if(isEditing){
            const listOrder = order.filter(o => o.listaId === list.id);
            const listTasks = listOrder.map(o => tasks.find(t => t.id === o.zadatakId))
            setChosenTasks(listTasks);
            setTaskOrder(listOrder);
        }
    },[list, isEditing, tasks, order]);

    const handleToggleTask = (id) => {
        const alreadySelected = tempTasks.find(t => t.id === id);
        let updated;
        if(alreadySelected){
            updated = tempTasks.filter(t => t.id!==id);
        }else{
            const newTask = tasks.find(t => t.id === id);
            updated = [...tempTasks, newTask];
        }
        setTempTasks(updated);
    }

    const handleConfirmTasks = () => {
        setChosenTasks(tempTasks);
        const newOrder = tempTasks.map((t,index) => ({
            listaId: listData.id,
            zadatakId: t.id,
            rb: index 
        }));
        
        setTaskOrder(newOrder);
        setIsSelecting(false);
    }

    const handleSave = () => {
        const finalList = {
            ...listData
        }
        onSave(finalList, taskOrder);
        onClose();
    }

    const handleDelete = () => {
        onDelete(listData.id);
        onClose();
    }

    const handleCancel = () => {
        onClose();
    }

  return (
    <div className='modal'>
        <div className='list-details' onClick={e => e.stopPropagation()}>
            <IoCloseCircleOutline className='close' size={30} color='#8D5045' onClick={handleCancel}/>

            <input
                className='input'
                placeholder='Naziv liste'
                value={listData.naziv}
                onChange={e => setListData({...listData, naziv: e.target.value})}
            />

            {chosenTasks.length > 0 && chosenTasks.map((t,i) => (
                <p key={t.id} className='item'>
                    {i + 1}. {t.naziv}
                </p>
            ))}

            <div className='buttons'>
                <button
                    className='btn-add'
                    onClick={()=>{
                        setTempTasks([...chosenTasks]);
                        setIsSelecting(true);
                    }}>
                        Dodaj zadatke
                </button>
                <button className='btn-save' onClick={handleSave}>
                    Sacuvaj
                </button>
                <button className='btn-delete' onClick={isEditing ? handleDelete : handleCancel}>
                    {isEditing ? 'Obrisi' : 'Otkazi'}
                </button>
            </div>
        </div>

        {isSelecting && (
            <div className='modal'>
                <div className='add-task' onClick={e => e.stopPropagation()}>
                    <h2>Zadaci</h2>
                    <div className='add-task-buttons'>
                        <MultiSelectButtons
                            items={tasks}
                            selected={tempTasks.map(t=>t.id)}
                            onToggle={handleToggleTask}
                        />
                    </div>
                    <div className='buttons'>
                        <button className='btn-save' onClick={handleConfirmTasks}> 
                            Dodaj
                        </button>
                        <button className='btn-delete' onClick={()=>setIsSelecting(false)}>
                            Otkazi
                        </button>
                    </div>
                </div>

            </div>
        )}
        
    </div>
  )
}

export default ListModalForm