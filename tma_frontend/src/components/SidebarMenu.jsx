import React, {useState} from 'react'
import TaskModalForm from './TaskModalForm'
import ListModalForm from './ListModalForm'
import CategoryModalForm from './CategoryModalForm'
import { useAuth } from '../AuthContext'

const SidebarMenu = ({
    tasks, addTask, updateTask, deleteTask,
    lists, order, saveList, deleteList,
    addCategory, deleteCategory,
    categories, status, priority
}) => {
    const {currentUser} = useAuth();
    const isVerified = currentUser?.is_verified;
    
  const [openAddTaskMenu, setOpenAddTaskMenu] = useState(false);
  const [openAddListMenu, setOpenAddListMenu] = useState(false);
  const [openAddCategoryMenu, setOpenAddCategoryMenu] = useState(false);
  const [openDeleteCategoryMenu, setOpenDeleteCategoryMenu] = useState(false);
  return (
    <div className='menu-container'>
        <p className='option' onClick={()=>setOpenAddTaskMenu(true)}>Kreiraj zadatak</p>
        {openAddTaskMenu && (
            <TaskModalForm
                initialData={null}
                onAdd={addTask}
                onSave={updateTask}
                onClose={()=>setOpenAddTaskMenu(false)}
                onDelete={deleteTask}
                categories = {categories}
                status={status}
                priority={priority} 
            />
        )}
        {Boolean(isVerified) && (
        <p className='option' onClick={()=>setOpenAddListMenu(true)}>Kreiraj listu</p>
        )}
        {openAddListMenu && (
            <ListModalForm
                list={null}
                tasks={tasks}
                order={order}
                onSave={saveList}
                onDelete={deleteList}
                onClose={()=>setOpenAddListMenu(false)}
            />
        )}
        <p className='option' onClick={()=>setOpenAddCategoryMenu(true)}>Dodaj kategoriju</p>
        {openAddCategoryMenu && (
            <CategoryModalForm
                categories={categories}
                isNew={true}
                onAdd={addCategory}
                onDelete={deleteCategory}
                onClose={()=>setOpenAddCategoryMenu(false)}
            />
        )}
        <p className='option' onClick={()=>setOpenDeleteCategoryMenu(true)}>Obrisi kategoriju</p>
        {openDeleteCategoryMenu && (
            <CategoryModalForm
                categories={categories}
                isNew={false}
                onAdd={addCategory}
                onDelete={deleteCategory}
                onClose={()=>setOpenDeleteCategoryMenu(false)}
            />
        )}
    </div>
  )
}

export default SidebarMenu