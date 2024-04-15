import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

//Importamos las paginas en el main.jsx
import { Music }  from "./pages/Music.jsx"
import { Books } from "./pages/Read.jsx"
import { Videogames } from "./pages/Videogames.jsx"
import { Home }from "./pages/Home.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='music' element={<Music />} />
          <Route path='videogames' element={<Videogames />} />
          <Route path='read' element={<Books />} />
          <Route
            path="*"
            element={
              <main>
                <p>404 - No existe la ruta!</p>
              </main>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
