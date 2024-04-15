import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

function App() {


  return (
    <>
      <div className="App">
      <header className="header">
        <h1>React Router v6 🧪</h1>
      </header>
      <div>
        <nav >
          <span><NavLink to="">HOME</NavLink></span>
          <span><NavLink to="videogames">MIS VIDEOJUEGOS</NavLink></span>
          <span><NavLink to="read">MIS LIBROS</NavLink></span>
          <span><NavLink to="music">MI MUSICA</NavLink></span>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
    </>
  )
}

export default App
