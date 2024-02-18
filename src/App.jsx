import { useEffect, useState } from 'react'
import Home from './views/Home'
import ForDate from './views/ForDate';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [dataCurrencies, setDataCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then(response => response.json())
      .then(data => {
        const dataArray = Object.entries(data).map(([clave, valor]) => valor.codigo ? { ...valor } : null);
        const filterArray = dataArray.filter((data) => data);
        setDataCurrencies(filterArray);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home dataCurrencies={dataCurrencies}/>}></Route>
        <Route path={'/por-fecha'} element={<ForDate dataCurrencies={dataCurrencies}/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
