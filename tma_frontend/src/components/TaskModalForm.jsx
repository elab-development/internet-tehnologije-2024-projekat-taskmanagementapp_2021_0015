import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import Buttons from './Buttons';
import '../css/TaskModalForm.css';
import {useAuth} from '../AuthContext';

const TaskModalForm = (
    {initialData, nextId, onAdd, onUpdate, onClose, onDelete, 
    categories = [], status = [], priority = []}) => {  
    
    const {currentUser} = useAuth();

    const isNew = !initialData?.id;
    const [isEditing, setIsEditing] = useState(isNew); 
    const createInitialData = (initialData) => ({
        id: initialData?.id ?? null,
        naziv: initialData?.naziv ?? '',
        opis: initialData?.opis ?? '',
        rok: initialData?.rok ?? '',
        status: initialData?.status ?? '',
        prioritet: initialData?.prioritet ?? '',
        kategorija: initialData?.kategorija ?? ''
    })
    const [data, setData] = useState(createInitialData(initialData));

    useEffect(() => {
        setData(createInitialData(initialData));
        setIsEditing(isNew);
    },[initialData, isNew]);

    const handleSave = () => {
        const finalTask = {
            ...data,
            id: data.id ?? nextId(),
            korisnik: currentUser.id
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

    const categoryName = categories.find(c => c.id === data.kategorija)?.naziv || '';  
    
  return (
    <div className='modal'>
        <div className='task-details' onClick={e => e.stopPropagation()}>
            <IoCloseCircleOutline className='close' size={30} color='#8d5045' onClick={onClose} />
            
            <input 
                className='input' 
                name='naziv' 
                value={data.naziv} 
                onChange={e => setData({...data, naziv:e.target.value})}
                placeholder='Naziv'
                readOnly={!isEditing}
            />

            <textarea 
                className='textarea'
                name='opis'
                value={data.opis}
                onChange={e => setData({...data, opis:e.target.value})}
                placeholder='Opis'
                rows={4}
                readOnly={!isEditing}
            />

            <label>Rok:
                <input 
                type='date'
                name='rok'
                value={data.rok}
                onChange={e => setData({...data, rok:e.target.value})}
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
                    selected={data.prioritet} 
                    setSelected={val=>setData({...data, prioritet:val})} 
                    disabled={!isEditing}/>

            <label>Kategorija:</label>
            <Buttons items={categories.map(c => c.naziv)} 
                    selected={categoryName} 
                    setSelected={(name) => {
                        const cat = categories.find(c => c.naziv === name)
                        setData({...data, kategorija: cat?.id || null})}}
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