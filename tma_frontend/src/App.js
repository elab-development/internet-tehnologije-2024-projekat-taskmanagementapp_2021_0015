import logo from './logo.svg';
import './App.css';
import {zadaci, kategorije, liste, redosled, korisnici} from './Data';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';

const status = ['Nije zapocet', 'U toku', 'Zavrseno'];
const prioritet = ['Visok', 'Srednji', 'Nizak'];

function App() {

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
