import logo from './logo.svg';
import './App.css';
import {zadaci, kategorije, liste, redosled, korisnici} from './Data';
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';

const status = ['Nije zapocet', 'U toku', 'Zavrseno'];
const priority = ['Visok', 'Srednji', 'Nizak'];

function App() {
  const [tasks, setTasks] = useState(zadaci);
  const [categories, setCategories] = useState(kategorije);

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
                    tasks = {tasks}
                    categories = {categories}
                    status= {status}
                    priority= {priority} 
                  />
                </div>

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
