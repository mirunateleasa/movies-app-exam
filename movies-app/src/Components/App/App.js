import './App.css';
import NavBar from '../NavBar/NavBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Movies from '../Parent/Movies';
import OneMovie from '../Child/OneMovie';
import Home from './Home';

function App() {
  return (
    <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path = '/' element = {<Home></Home>}/>
                <Route path = '/movies' element = {<Movies></Movies>}/>
                <Route path = {`/movies/:movieId`} element = {<OneMovie></OneMovie>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
