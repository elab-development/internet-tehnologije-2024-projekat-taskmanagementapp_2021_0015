import React, {useState} from 'react'
import Search from './Search'
import Filter from './Filter'
import '../css/Sidebar.css'
import SidebarMenu from './SidebarMenu'
import PlusButton from './PlusButton'
import MotivationalQuote from './MotivationalQuote'

const Sidebar = (
    {searchTerm, setSearchTerm,
    status, priority, categories,
    filterStatus, filterPriority, filterCategory,
    setFilterStatus, setFilterPriority, setFilterCategory,
    tasks, addTask, updateTask, deleteTask,
    lists=null, order=null, saveList, deleteList,
    addCategory, deleteCategory
    }
) => {
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  return (
    <div className='sidebar'>
        <div className='search-and-filter'>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <MotivationalQuote />
            <Filter status={status} priority={priority} categories={categories}
            filterStatus={filterStatus} filterPriority={filterPriority} filterCategory={filterCategory}
            setFilterStatus={setFilterStatus} setFilterPriority={setFilterPriority} setFilterCategory={setFilterCategory}/>
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

export default Sidebar