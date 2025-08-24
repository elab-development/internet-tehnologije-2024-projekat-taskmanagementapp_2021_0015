import './App.css';
import { useEffect, useState} from 'react';
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
import ListSidebar from './components/ListSidebar';
import axios from 'axios';
import Profile from './components/Profile';


function App() {
  const {currentUser, setCurrentUser, token} = useAuth();
  const isVerified = currentUser?.is_verified;
  const isAdmin = currentUser?.role === 'admin';

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);

  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const tasks_per_page = 9;

  const [listsCurrentPage, setListsCurrentPage] = useState(1);
  const [listsTotalItems, setListsTotalItems] = useState(0);
  const lists_per_page = 6;

  const fetchTasks = async () => {
    let response;
    const hasFilters = filterStatus || filterPriority || filterCategory;

    const params = {
      page: currentPage,
      per_page: tasks_per_page
    };

    if(filterStatus) params.status = filterStatus;
    if(filterPriority) params.priority = filterPriority;
    if(filterCategory) params.category_id = filterCategory;

    if(hasFilters){
      response = await axios.get("api/tasks/filter", {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
    }else{
      response = await axios.get("api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        params
      })
    }
    console.log("Fetched tasks response:", response.data);
    setTasks(response.data.tasks);
    setCurrentPage(response.data.current_page);
    setTotalItems(response.data.total);
    }

    const fetchLists = async() => {
      const listsResponse = await axios.get("api/task_lists", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: listsCurrentPage,
          per_page: lists_per_page
        }
      });

      const orderResponse = await axios.get("api/lists", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLists(listsResponse.data.task_lists);
      setOrder(orderResponse.data.data.flat());
      setListsCurrentPage(listsResponse.data.current_page);
      setListsTotalItems(listsResponse.data.total);

      await fetchAllTasks();
    }

  useEffect(()=>{
    const fetchData = async ()=> {
      try {
        console.log("Fetch data se poziva");
        const [categoriesResponse, statusResponse, priorityResponse] = await Promise.all([
          axios.get("api/categories", {headers: { Authorization: `Bearer ${token}` }}),
          axios.get("api/statuses"),
          axios.get("api/priorities")
        ]);
  
        setCategories(categoriesResponse.data.data);
        setStatus(statusResponse.data.map(s => s.name));
        setPriority(priorityResponse.data.map(p => p.name));
      }
      catch (err) {
        console.error("Greska pri ucitavanju podataka",err);
      } 
    }

    if(currentUser){
      fetchData();
    }
    
  }, [currentUser]);


  useEffect(() => {
    if(!token) return;
    fetchTasks();
  },[filterStatus, filterPriority, filterCategory, token, currentPage]);

  useEffect(() => {
    if(!token) return;
    
    if(isVerified) {
      fetchLists();
    }
  }, [listsCurrentPage, token, isVerified]);

  const [searchTerm, setSearchTerm] = useState('');
  
  
  const filteredTasks = (tasks ?? []).filter(task => {
    const searchMatch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });

  const filteredLists = lists.filter(list => {
    const search = searchTerm.toLowerCase();

    const listNameMatch = list.name.toLowerCase().includes(search);

    const listTasksId = order.filter(o => o.task_list_id === list.id).map(o => o.task_id);
    const listTasks = tasks.filter(t => listTasksId.includes(t.id));

    const taskMatch = listTasks.some(t => t.name.toLowerCase().includes(search));

    return listNameMatch || taskMatch;
  });

  const addTask = async (newTask) => {
    try {
      await axios.post("api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks()
    } catch (error) {
      if(error.response && error.response.status === 403){
        alert("Dostignut limit od 20 zadataka. Izvrsite verifikaciju i otkljucajte sve funkcionalnosti.");
      }else{
        console.error(error);
      }
    }
  }

  const updateTask = async (updatedTask) => {
    try {
      await axios.put("api/tasks/"+ updatedTask.id, updatedTask,{
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchTasks();
    } catch (error) {
      if(error.response && error.response.status === 403){
        alert("Ne mozete da azurirate zadatke dok se ne verifikujete.");
      }else{
        console.error(error);
      }
    }
  }
  
  const deleteTask = async (id) => {
    const inList = order.some(o => o.task_id === id);

    if(inList){
      const confirmDelete = window.confirm(
        "Zadatak se nalazi u listi. Da li zaista zelite da ga obrisete?"
      );
      if(!confirmDelete) return;
    }

    await axios.delete("api/tasks/"+ id, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
    setOrder(prev => prev.filter(o => o.task_id !== id));
  }


  const handleSaveList = async (list, listOrder) => {
    if(!list.id){
      const response = await axios.post("api/task_lists", {name: list.name}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newList = response.data.task_list;
      const listId = newList.id;

      for(const o of listOrder){
        await axios.post("api/lists", {
          task_list_id: listId,
          task_id: o.task_id
        },{
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchLists();
      const updatedOrder = listOrder.map(o => ({...o, task_list_id : listId}));
      setOrder(prev => [...prev,...updatedOrder]);

    }else{
      await axios.put("api/task_lists/"+ list.id, {name: list.name}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      for(const old of order.filter(o => o.task_list_id === list.id)){
        await axios.delete("api/lists/"+list.id+"/"+old.task_id, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      for(const o of listOrder){
        await axios.post("api/lists", {
          task_list_id: list.id,
          task_id: o.task_id
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchLists();
      setOrder(prev => [...prev.filter(o => o.task_list_id !== list.id),...listOrder]);
    }
  }

  const handleDeleteList = async (id) => {
    await axios.delete("api/task_lists/"+id, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchLists();
    setOrder(prev => prev.filter(o => o.listaId !== id));
  }

  const addCategory = async (newCategory) => {
    console.log("Dobijena kategorija: ", newCategory);
    const response = await axios.post("api/categories", newCategory, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(prev => [...prev, response.data.category]);
  }

  const deleteCategory = async (id) => {
    await axios.delete("api/categories/"+ id, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(prev => prev.filter(c => c.id !== id));
    setTasks(prev => prev.map(t => t.category_id===id ? {...t,category_id:null} : t));
  }

  const setTaskAsDone = async (task) => {
    const updatedTask = {
      ...task,
      status: 'Finished'
    }
    await updateTask(updatedTask);
  }

  const [allTasks, setAllTasks] = useState([]);

  const fetchAllTasks = async () => {
    const response = await axios.get("api/tasks", {
      headers: { Authorization: `Bearer ${token}`},
      params: {
        per_page: 1000
      }
    });
    setAllTasks(response.data.tasks);
  }

  const updateProfile = async (updatedUser) => {
    const response = await axios.put("api/user", updatedUser, {
      headers: { Authorization: `Bearer ${token}`}
    })
    setCurrentUser(response.data.user);
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
              <Register />
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
              <Login />
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
                    tasks = {filteredTasks}
                    categories = {categories}
                    status= {status}
                    priority= {priority} 
                    onAdd={addTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={tasks_per_page}
                    onPageChange={setCurrentPage}
                  />
                </div>
                <Sidebar
                  searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                  status={status} priority={priority} categories={categories}
                  filterStatus={filterStatus} filterPriority={filterPriority} filterCategory={filterCategory}
                  setFilterStatus={setFilterStatus} setFilterPriority={setFilterPriority} setFilterCategory={setFilterCategory}
                  tasks={allTasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask}
                  lists={lists} order={order} saveList={handleSaveList} deleteList={handleDeleteList}
                  addCategory={addCategory} deleteCategory={deleteCategory}
                />
              </div>
            </>
            </ProtectedRoute>
          }
        />
        {isVerified && (
        <Route
          path = '/lists'
          element = {
            <ProtectedRoute>
            <>
              <div className='header'>
                <NavBar type={'normal'}/>
              </div>
              <div className='contents'>
                <div className='main-container'>
                  <Lists
                    tasks={allTasks}
                    lists={filteredLists}
                    order={order}
                    onSave={handleSaveList}
                    onDelete={handleDeleteList}
                    setTaskAsDone={setTaskAsDone}
                  />
                  <Pagination
                    currentPage={listsCurrentPage}
                    totalItems={listsTotalItems}
                    itemsPerPage={lists_per_page}
                    onPageChange={setListsCurrentPage}
                  />
                </div>
                <ListSidebar
                  searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                  status={status} priority={priority} categories={categories}
                  tasks={allTasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask}
                  lists={lists} order={order} saveList={handleSaveList} deleteList={handleDeleteList}
                  addCategory={addCategory} deleteCategory={deleteCategory}
                />
              </div>
            </>
            </ProtectedRoute>
          }
        />)}
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <>
                <div className='header'>
                  <NavBar type={'normal'}/>
                </div>
                <div className='login-page'>
                  <Profile onUpdate={updateProfile}/>
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
