import { useState } from 'react'
import Home from './views/Home'
import ForDate from './views/ForDate';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'/por-fecha'} element={<ForDate />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
