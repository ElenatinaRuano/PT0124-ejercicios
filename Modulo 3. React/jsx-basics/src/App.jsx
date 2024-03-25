import { useState } from 'react';
import './App.css'

function App() {
  const time = (hour) => {
    if( hour >= 6 && hour <= 12 ) {
      return `Buenas días, son las ${hour}:00h de la mañana`;
    }else if ( hour >= 13 && hour <= 19 ){
      return `Buenas tardes, son las ${hour}:00h de la tarde`
    }else{
      return `Buenas noches, son las ${hour}:00h de la noche`
    }
  }

  const listPeople = ["Angel", "Elena", "Beatriz", "Sebastian", "David", "Sandra"];

  const animals = [
    {
      type: "perro",
      name: "Sally"
    },
    {
      type: "gato",
      name: "Simon"
    },
    {
      type: "agaporni",
      name: "Pedro"
    },
  ]

  const [buttonOn, setbuttonOn] = useState(false);

  return (
    <>
      <h1>{time(20)}</h1><br />

      <div>{listPeople.map((person,index) => <h2 key={index}>Hola {person} </h2>)}</div><br />

      <div>{animals.map((animal, index) => <h2 key={index}>Es un {animal.type} y se llama {animal.name}</h2>)}</div><br />

      <button onClick={() => setbuttonOn(!buttonOn)}>PULSAME</button>
      <h2>{buttonOn ?"HOLI" :""}</h2>
    </>
  )
}

export default App
