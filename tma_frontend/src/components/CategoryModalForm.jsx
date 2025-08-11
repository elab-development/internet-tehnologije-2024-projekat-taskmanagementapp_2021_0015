import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import Buttons from './Buttons';
import '../css/CategoryModalForm.css';

const CategoryModalForm = ({categories, isNew, onAdd, onClose, onDelete}) => {
    const [newCategory, setNewCategory] = useState(null);

    useEffect(()=>{
        if(isNew){
            setNewCategory({
                name: '',
                tag: ''
            });
        }
    },[isNew]);

    const [categoryForDeletion, setCategoryForDeletion] = useState(null);

    const handleSave = () => {
        onAdd(newCategory);
        onClose();
    }

    const handleCancel = () =>{
        onClose();
    }

    const handleDelete = () => {
        onDelete(categoryForDeletion.id);
        onClose();
    }

  return (
    <div className='modal'>
        <div className='category-details' onClick={e => e.stopPropagation()}>
            <IoCloseCircleOutline className='close' size={30} color='#8d5045' onClick={handleCancel} />
            {isNew && (
                <>
                <input 
                    className='input' 
                    placeholder='Naziv kategorije'  
                    onChange={e => setNewCategory({...newCategory, name:e.target.value})}
                />
        
                <input 
                    className='input' 
                    placeholder='Tag' 
                    onChange={e => setNewCategory({...newCategory, tag:e.target.value})}
                />
                                
                <div className='buttons'>
                    <button className='btn-save' onClick={handleSave}>
                        Sacuvaj
                    </button>
                    <button className='btn-delete' onClick={handleCancel}>
                        Otkazi
                    </button>
                </div>
                </>
            )}
                
            {!isNew && (
                <>
                <h3>Izaberite kategoriju za brisanje</h3>
                <Buttons 
                    items={categories.map(c => c.name)} 
                    setSelected={(name) => {
                        const chosenCategory = categories.find(c => c.name === name)
                        setCategoryForDeletion(chosenCategory);
                    }} 
                    selected={categoryForDeletion?.name || null}/>
                    
                <div className='buttons'>
                    <button className='btn-delete' onClick={handleDelete}>
                        Izbrisi
                    </button>
                    <button className='btn-delete' onClick={handleCancel}>
                        Otkazi
                    </button>
                </div>
                </>
            )}
        </div>
    </div>
  )
}

export default CategoryModalForm