import logo from './logo.svg';
import './App.css';
import {zadaci, kategorije, liste, redosled, korisnici} from './Data';
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import Lists from './components/Lists';

const status = ['Nije zapocet', 'U toku', 'Zavrseno'];
const priority = ['Visok', 'Srednji', 'Nizak'];

function App() {
  const [tasks, setTasks] = useState(zadaci);
  const [categories, setCategories] = useState(kategorije);
  const [lists, setLists] = useState(liste);
  const [order, setOrder] = useState(redosled);

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
      setOrder(prev => [...prev,listOrder]);
    }
  }

  const handleDeleteList = (id) => {
    setLists(prev => prev.filter(l => l.id !== id));
    setOrder(prev => prev.filter(o => o.listaId !== id));
  }

  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [openAddTaskMenu, setOpenAddTaskMenu] = useState(false);
  const [openAddListMenu, setOpenAddListMenu] = useState(false);

  return (
    <BrowserRouter>
     <div>
      <Routes>
        <Route 
          path = '/tasks'
          element = {
            <>
              <div className='header'>
                <NavBar />
              </div>
              <div className='contents'>
                <div className='main-container'>
                  <Tasks 
                    tasks = {filteredTasks}
                    categories = {categories}
                    status= {status}
                    priority= {priority} 
                    onAdd={addTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
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
                />
              </div>
            </>
          }
        />
        <Route
          path = '/lists'
          element = {
            <>
              <div className='header'>
                <NavBar />
              </div>
              <div className='lists-page'>
                <Lists
                  tasks={tasks}
                  lists={lists}
                  order={order}
                  onSave={handleSaveList}
                  onDelete={handleDeleteList}
                />
              </div>
            </>
          }
        />

        
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
