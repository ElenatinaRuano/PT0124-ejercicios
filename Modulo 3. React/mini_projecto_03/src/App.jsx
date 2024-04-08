import './App.css'
import { Videogames } from "./components/Videogames/Videogames"
import { Books } from "./components/Read/Read"
import { Music } from "./components/Music/Music"

function App() {

  return (
    <>
      <h1>MIS HOBBIES</h1>
      <Books />
      <Videogames />
      <Music />

    </>
  )
}

export default App
