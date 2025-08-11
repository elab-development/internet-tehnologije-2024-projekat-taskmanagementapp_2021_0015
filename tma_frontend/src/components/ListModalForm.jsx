import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import MultiSelectButtons from './MultiSelectButtons';
import '../css/ListModalForm.css';
import {useAuth} from '../AuthContext';
import Pagination from './Pagination';
import axios from 'axios';



const ListModalForm = ({list=null, tasks, order, onSave, onDelete, onClose}) => {
    const {currentUser} = useAuth();
    const isEditing = list!==null;
    const [listData, setListData] = useState(
        list || {name: ''}
    )
    const [listTasks, setListTasks] = useState([]); //trenutno odabrani zadaci u listi
    const [isSelecting, setIsSelecting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const max_tasks = 9;
    
    useEffect(()=>{
        if(isEditing){
            const listOrder = order.filter(o => o.task_list_id === list.id);
            const assignedTasks = listOrder.map(o => tasks.find(t => t.id === o.task_id));
            setListTasks(assignedTasks);
        }else{
            setListTasks([]);
        }
    },[list, isEditing, order, tasks]);

    const indexOfLastTask = currentPage*max_tasks;
    const indexOfFirstTask = indexOfLastTask - max_tasks;
    const paginatedTasks = tasks.slice(indexOfFirstTask, indexOfLastTask); 

    const handleToggleTask = (taskId) => {
        let updated;
        if(listTasks.some(t => t.id === taskId)){
            updated = tasks.filter(t => t.id !== taskId);
        }else{
            const taskToAdd = tasks.find(t => t.id === taskId);
            if(taskToAdd) updated = [...listTasks, taskToAdd];
        }
        setListTasks(updated);
    }

    const handleConfirmTasks = () => {
        setIsSelecting(false);
    }

    const handleSave = () => {
        const newOrder = listTasks.map((t,index) => ({
            task_list_id: listData.id,
            task_id: t.id,
            rb: index 
        }));

        const finalList = {
            ...listData,
            user: currentUser
        }
        onSave(finalList, newOrder);
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
                value={listData.name}
                onChange={e => setListData({...listData, name: e.target.value})}
            />

            {listTasks.length>0 && listTasks.map((t,i) => (
                <p key={t.id} className='item'>
                    {i + 1}. {t.name}
                </p>
            ))}

            <div className='buttons'>
                <button
                    className='btn-add'
                    onClick={()=>{
                        setCurrentPage(1);
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
                            items={paginatedTasks}
                            selected={listTasks.map(t => t.id)}
                            onToggle={handleToggleTask}
                            disabled={listTasks.length >= max_tasks ? 
                                paginatedTasks.filter(t => !listTasks.includes(t.id)).map(t => t.id) : []
                            }
                        />
                    </div>
                    <div className='tasks-pagination'>
                        <Pagination
                            currentPage={currentPage}
                            totalItems={tasks.length}
                            itemsPerPage={max_tasks}
                            onPageChange={setCurrentPage}
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