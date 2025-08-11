import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import Buttons from './Buttons';
import '../css/TaskModalForm.css';
import {useAuth} from '../AuthContext';

const TaskModalForm = (
    {initialData, onAdd, onUpdate, onClose, onDelete, 
    categories = [], status = [], priority = []}) => {  
    
    const {currentUser} = useAuth();

    const isNew = !initialData?.id;
    const [isEditing, setIsEditing] = useState(isNew); 
    const createInitialData = (initialData) => ({
        id: initialData?.id ?? null,
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        due_date: initialData?.due_date ?? '',
        status: initialData?.status?? '',
        priority: initialData?.priority ?? '',
        category_id: initialData?.category?.id ?? ''
    })
    const [data, setData] = useState(createInitialData(initialData));

    useEffect(() => {
        setData(createInitialData(initialData));
        setIsEditing(isNew);
    },[initialData, isNew]);

    const handleSave = () => {
        const finalTask = {
            ...data,
            category_id: data.category_id,
            user:currentUser
        }

        if(isNew){
            onAdd(finalTask);
        }else{
            onUpdate(finalTask);
        }

        setIsEditing(false);
        onClose();
    }

    const handleDeleteOrCancel = () => {
        if(isEditing && !isNew){
            onDelete(data.id);
        }
        setIsEditing(false);
        onClose();
    }

    const categoryName = categories.find(c => c.id === data.category_id)?.name || '';  
    
  return (
    <div className='modal'>
        <div className='task-details' onClick={e => e.stopPropagation()}>
            <IoCloseCircleOutline className='close' size={30} color='#8d5045' onClick={onClose} />
            
            <input 
                className='input' 
                name='name' 
                value={data.name} 
                onChange={e => setData({...data, name:e.target.value})}
                placeholder='Naziv'
                readOnly={!isEditing}
            />

            <textarea 
                className='textarea'
                name='description'
                value={data.description}
                onChange={e => setData({...data, description:e.target.value})}
                placeholder='Opis'
                rows={4}
                readOnly={!isEditing}
            />

            <label>Rok:
                <input 
                type='date'
                name='due_date'
                value={data.due_date}
                onChange={e => setData({...data, due_date:e.target.value})}
                disabled={!isEditing} 
                />
            </label>

            <label>Status:</label>
            <Buttons items={status} 
                    selected={data.status} 
                    setSelected={val=>setData({...data, status:val})} 
                    disabled={!isEditing}/>

            <label>Prioritet:</label>
            <Buttons items={priority} 
                    selected={data.priority} 
                    setSelected={val=>setData({...data, priority:val})} 
                    disabled={!isEditing}/>

            <label>Kategorija:</label>
            <Buttons items={categories.map(c => c.name)} 
                    selected={categoryName} 
                    setSelected={(cat_name) => {
                        const cat = categories.find(c => c.name === cat_name)
                        setData({...data, category_id: cat?.id || ''})}}
                    disabled={!isEditing}/>
        
            <div className='buttons'>
                {!isNew && !isEditing && (
                    <button className='btn-edit' onClick={() => setIsEditing(true)}>
                        Izmeni
                    </button>    
                )}
                {isEditing && (
                    <button className='btn-save' onClick={handleSave}>
                        Sacuvaj
                    </button>
                )}
                <button className='btn-delete' onClick={handleDeleteOrCancel}>
                    {isEditing && !isNew ? 'Obrisi':'Otkazi'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default TaskModalForm