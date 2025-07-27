import React from 'react'
import TaskModalForm from './TaskModalForm'
import ListModalForm from './ListModalForm'
import CategoryModalForm from './CategoryModalForm'

const SidebarMenu = ({
    openAddTaskMenu, setOpenAddTaskMenu,
    tasks, addTask, updateTask, deleteTask,
    openAddListMenu, setOpenAddListMenu,
    lists, order, saveList, deleteList,
    openAddCategoryMenu, setOpenAddCategoryMenu,
    openDeleteCategoryMenu, setOpenDeleteCategoryMenu,
    addCategory, deleteCategory,
    categories, status, priority
}) => {
  return (
    <div className='menu-container'>
        <p className='option' onClick={()=>setOpenAddTaskMenu(true)}>Kreiraj zadatak</p>
        {openAddTaskMenu && (
            <TaskModalForm
                initialData={null}
                nextId={() => Math.max(-1,...tasks.map(t=>t.id)) + 1}
                onAdd={addTask}
                onSave={updateTask}
                onClose={()=>setOpenAddTaskMenu(false)}
                onDelete={deleteTask}
                categories = {categories}
                status={status}
                priority={priority} 
            />
        )}
        <p className='option' onClick={()=>setOpenAddListMenu(true)}>Kreiraj listu</p>
        {openAddListMenu && (
            <ListModalForm
                list={null}
                tasks={tasks}
                order={order}
                nextId={()=> Math.max(-1,...lists.map(l=>l.id)) + 1}
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
                nextId={()=>Math.max(-1,...categories.map(c=>c.id)) + 1}
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
                nextId={-1}
                onAdd={addCategory}
                onDelete={deleteCategory}
                onClose={()=>setOpenDeleteCategoryMenu(false)}
            />
        )}
    </div>
  )
}

export default SidebarMenu