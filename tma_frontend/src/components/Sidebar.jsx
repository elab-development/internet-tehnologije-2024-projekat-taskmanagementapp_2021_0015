import React from 'react'
import Search from './Search'
import Filter from './Filter'
import '../css/Sidebar.css'
import SidebarMenu from './SidebarMenu'
import PlusButton from './PlusButton'

const Sidebar = (
    {searchTerm, setSearchTerm,
    status, priority, categories,
    filterStatus, filterPriority, filterCategory,
    setFilterStatus, setFilterPriority, setFilterCategory,
    openSelectMenu, setOpenSelectMenu,
    openAddTaskMenu, setOpenAddTaskMenu,
    tasks, addTask, updateTask, deleteTask,
    openAddListMenu, setOpenAddListMenu,
    lists, order, saveList, deleteList,
    openAddCategoryMenu, setOpenAddCategoryMenu,
    openDeleteCategoryMenu, setOpenDeleteCategoryMenu,
    addCategory, deleteCategory
    }
) => {
  return (
    <div className='sidebar'>
        <div className='search-and-filter'>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Filter status={status} priority={priority} categories={categories}
            filterStatus={filterStatus} filterPriority={filterPriority} filterCategory={filterCategory}
            setFilterStatus={setFilterStatus} setFilterPriority={setFilterPriority} setFilterCategory={setFilterCategory}/>
        </div>
        <div className='plus-btn-container'> 
          {openSelectMenu && (
            <SidebarMenu
              openAddTaskMenu={openAddTaskMenu} setOpenAddTaskMenu={setOpenAddTaskMenu} 
              tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask}
              openAddListMenu={openAddListMenu} setOpenAddListMenu={setOpenAddListMenu}
              lists={lists} order={order} saveList={saveList} deleteList={deleteList}
              openAddCategoryMenu={openAddCategoryMenu} setOpenAddCategoryMenu={setOpenAddCategoryMenu}
              openDeleteCategoryMenu={openDeleteCategoryMenu} setOpenDeleteCategoryMenu={setOpenDeleteCategoryMenu}
              addCategory={addCategory} deleteCategory={deleteCategory}
              categories={categories} status={status} priority={priority}
            />
          )}
          <PlusButton isOpen={openSelectMenu} onClick={()=>setOpenSelectMenu(prev => !prev)}/>
        </div>
    </div>
  )
}

export default Sidebar