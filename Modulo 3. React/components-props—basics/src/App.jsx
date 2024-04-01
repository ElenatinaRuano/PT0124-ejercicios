import { Paragraph, SubTitle, Title, Image } from "./components"
import './App.css'

function App() {

  return (
    <div>
      <Title text="EJERCICIO DE PROPS" />
      <SubTitle text="Este es mi primer ejercicio de props"/>
      <Image 
        src="https://media.licdn.com/dms/image/D4D12AQHR-Qf8JrSOVA/article-cover_image-shrink_423_752/0/1689959227757?e=1717632000&v=beta&t=jViEVHxrCI5inKu_3ArwR3zzmX3bQDQm6wGczfGHvps"
        alt = {"Esta es la imagen de mi primer ejercicio de props"}
        width = "50%"
        heigth = "70%"/>
      <Paragraph text = "Este es el parrafo de mi primer ejercicio de props"/>
    </div>
  )
}

export default App
