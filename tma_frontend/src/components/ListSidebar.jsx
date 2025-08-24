import React, { useState } from 'react'
import Search from './Search'
import SidebarMenu from './SidebarMenu'
import PlusButton from './PlusButton'
import '../css/Sidebar.css'
import MotivationalQuote from './MotivationalQuote'

const ListSidebar = ({
    searchTerm, setSearchTerm,
    status, priority, categories,
    tasks, addTask, updateTask, deleteTask,
    lists, order, saveList, deleteList,
    addCategory, deleteCategory
}) => {
    const [openSelectMenu, setOpenSelectMenu] = useState(false);
  return (
    <div className='sidebar'>
        <div className='search-and-filter'>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <MotivationalQuote />
        </div>
        <div className='plus-btn-container'>
            {openSelectMenu && (
                <SidebarMenu
                    tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask}
                    lists={lists} order={order} saveList={saveList} deleteList={deleteList}
                    addCategory={addCategory} deleteCategory={deleteCategory}
                    categories={categories} status={status} priority={priority}
                />
            )}
            <PlusButton isOpen={openSelectMenu} onClick={()=>setOpenSelectMenu(prev => !prev)}/>
        </div>
    </div>
  )
}

export default ListSidebar