import { Outlet  } from 'react-router-dom';
import { Header, Footer, Backgound} from './components'
import './App.css'

function App() {

  return (
    <>
      <Backgound />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
