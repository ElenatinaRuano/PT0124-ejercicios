import { Me } from "./components/Me/Me"
import { Education } from "./components/Education/Education";
import { Experience } from "./components/Experience/Experience"
import { About } from "./components/About/About";
import { Habilities } from "./components/Habilities/Habilities";
import { CV } from "./CV/Cv";
import { useState } from "react";
import "./App.css";

const { me, education, experience, languages, habilities } = CV;

function App() {

  const [showEducation, setShowEducation] = useState(true);

  return (
    <div className="App">
      <Me me={me}/>
      <button className="button-30" role="button" onClick={() => setShowEducation(true)}>ESTUDIOS</button>
      <button className="button-30" role="button" onClick={() => setShowEducation(false)}>EXPERIENCIA</button>
      <div>
      {showEducation 
      ? (<Education education={education}/>)
      : (<Experience experience={experience} />)
    }
      </div>
      <About about={ me }/>
      <Habilities languages={languages} habilities={habilities}/>
    </div>
  )
}

export default App
