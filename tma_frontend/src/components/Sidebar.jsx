import React from 'react'
import Search from './Search'
import Filter from './Filter'
import TaskModalForm from './TaskModalForm'
import '../css/Sidebar.css'
import { FaPlus, FaMinus } from "react-icons/fa";

const Sidebar = (
    {searchTerm, setSearchTerm,
    status, priority, categories,
    filterStatus, filterPriority, filterCategory,
    setFilterStatus, setFilterPriority, setFilterCategory,
    openSelectMenu, setOpenSelectMenu,
    openAddTaskMenu, setOpenAddTaskMenu,
    tasks, addTask, updateTask, deleteTask
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
              <p className='option'>Kreiraj listu</p>
              <p className='option'>Dodaj kategoriju</p>
              <p className='option'>Obrisi kategoriju</p>
            </div>
          )}
          <div className='plus-btn' onClick={()=>setOpenSelectMenu(prev=>!prev)}>
            {openSelectMenu ? <FaMinus/> : <FaPlus/>}
          </div>
        </div>
    </div>
  )
}

export default Sidebar