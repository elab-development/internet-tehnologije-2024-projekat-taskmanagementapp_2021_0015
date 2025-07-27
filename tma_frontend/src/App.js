import logo from './logo.svg';
import './App.css';
import {zadaci, kategorije, liste, redosled, korisnici} from './Data';
import {use, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import Lists from './components/Lists';
import {useAuth} from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Pagination from './components/Pagination';

const status = ['Nije zapocet', 'U toku', 'Zavrseno'];
const priority = ['Visok', 'Srednji', 'Nizak'];
const tasks_per_page = 3;
const lists_per_page = 3;

function App() {
  const {currentUser} = useAuth();

  const [users, setUsers] = useState(korisnici);
  const addUser = (newUser) => {
    setUsers(prev=>[...prev,newUser]);
  }

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(()=>{
    if(currentUser){
      const user_tasks = zadaci.filter(z => z.korisnik == currentUser.id);
      const user_lists = liste.filter(l => l.korisnik == currentUser.id);
      const user_order = redosled.filter(r => user_lists.some(l => l.id === r.listaId));
      const user_categories = kategorije.filter(k => user_tasks.some(t => t.kategorija === k.id));

      setTasks(user_tasks);
      setLists(user_lists);
      setOrder(user_order);
      setCategories(user_categories);
    }
  }, [currentUser]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  
  const filteredTasks = tasks.filter(task => {
    const searchMatch = task.naziv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.opis.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus ? task.status === filterStatus : true;
    const priorityMatch = filterPriority ? task.prioritet === filterPriority : true;
    const categoryMatch = filterCategory ? task.kategorija === filterCategory : true;

    return searchMatch && statusMatch && priorityMatch && categoryMatch;
  })

  const addTask = newTask => setTasks(prev => [...prev,newTask]);
  const updateTask = updated => setTasks(prev => prev.map(t=> (t.id===updated.id ? updated : t)));
  const deleteTask = id => setTasks(prev => prev.filter(t => t.id !== id));

  const handleSaveList = (list, listOrder) => {
    const isEditing = list && lists.some(l => l.id === list.id);
    if(isEditing){
      setLists(prev => prev.map(l => (l.id === list.id ? list : l)));
      setOrder(prev => [...prev.filter(o => o.listaId !== list.id),...listOrder])
    }else{
      setLists(prev => [...prev, list]);
      setOrder(prev => [...prev,...listOrder]);
    }
  }

  const handleDeleteList = (id) => {
    setLists(prev => prev.filter(l => l.id !== id));
    setOrder(prev => prev.filter(o => o.listaId !== id));
  }

  const addCategory = newCategory => setCategories(prev => [...prev,newCategory]);
  const deleteCategory = id => setCategories(prev => prev.filter(c => c.id !== id));

  const handleDeleteCategory = (id) => {
    setTasks(prevTasks => prevTasks.map(t => t.kategorija===id ? {...t,kategorija:null} : t))
    deleteCategory(id);
  }

  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [openAddTaskMenu, setOpenAddTaskMenu] = useState(false);
  const [openAddListMenu, setOpenAddListMenu] = useState(false);
  const [openAddCategoryMenu, setOpenAddCategoryMenu] = useState(false);
  const [openDeleteCategoryMenu, setOpenDeleteCategoryMenu] = useState(false);

  const [taskPage, setTaskPage] = useState(0);
  const visibleTasks = filteredTasks.slice(taskPage*tasks_per_page, (taskPage+1)*tasks_per_page);

  const [listPage, setListPage] = useState(0);
  const visibleLists = lists.slice(listPage*lists_per_page, (listPage+1)*lists_per_page);

  const setTaskAsDone = (id) => {
    setTasks(prevTasks=> prevTasks.map(t => t.id===id ? {...t,status:'Zavrseno'} : t));
  }

  return (
    <BrowserRouter>
     <div>
      <Routes>
        <Route
          path='/register'
          element = {
            <>
            <div className='header'>
              <NavBar type={'auth'}/>
            </div>
            <div className='login-page'>
              <Register addUser={addUser} users={users}/>
            </div>
            </>
          }
        />
        <Route
          path='/'
          element = {
            <>
            <div className='header'>
              <NavBar type={'auth'}/>
            </div>
            <div className='login-page'>
              <Login users={users}/>
            </div>
            </>
          }
        />
        <Route 
          path = '/tasks'
          element = {
            <ProtectedRoute>
            <>
              <div className='header'>
                <NavBar type={'normal'}/>
              </div>
              <div className='contents'>
                <div className='main-container'>
                  <Tasks 
                    tasks = {visibleTasks}
                    categories = {categories}
                    status= {status}
                    priority= {priority} 
                    onAdd={addTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                  <Pagination
                    currentPage={taskPage}
                    totalItems={filteredTasks.length}
                    itemsPerPage={tasks_per_page}
                    onPageChange={setTaskPage}
                  />
                </div>
                <Sidebar
                  searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                  status={status} priority={priority} categories={categories}
                  filterStatus={filterStatus} filterPriority={filterPriority} filterCategory={filterCategory}
                  setFilterStatus={setFilterStatus} setFilterPriority={setFilterPriority} setFilterCategory={setFilterCategory}
                  openSelectMenu={openSelectMenu} setOpenSelectMenu={setOpenSelectMenu}
                  openAddTaskMenu={openAddTaskMenu} setOpenAddTaskMenu={setOpenAddTaskMenu}
                  tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask}
                  openAddListMenu={openAddListMenu} setOpenAddListMenu={setOpenAddListMenu}
                  lists={lists} order={order} saveList={handleSaveList} deleteList={handleDeleteList}
                  openAddCategoryMenu={openAddCategoryMenu} setOpenAddCategoryMenu={setOpenAddCategoryMenu}
                  openDeleteCategoryMenu={openDeleteCategoryMenu} setOpenDeleteCategoryMenu={setOpenDeleteCategoryMenu}
                  addCategory={addCategory} deleteCategory={handleDeleteCategory}
                />
              </div>
            </>
            </ProtectedRoute>
          }
        />
        <Route
          path = '/lists'
          element = {
            <ProtectedRoute>
            <>
              <div className='header'>
                <NavBar type={'normal'}/>
              </div>
              <div className='lists-page'>
                <Lists
                  tasks={tasks}
                  lists={visibleLists}
                  order={order}
                  onSave={handleSaveList}
                  onDelete={handleDeleteList}
                  setTaskAsDone={setTaskAsDone}
                />
                <Pagination
                  currentPage={listPage}
                  totalItems={lists.length}
                  itemsPerPage={lists_per_page}
                  onPageChange={setListPage}
                />
              </div>
            </>
            </ProtectedRoute>
          }
        />
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
