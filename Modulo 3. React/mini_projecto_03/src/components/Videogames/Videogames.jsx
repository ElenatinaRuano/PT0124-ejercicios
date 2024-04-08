import "./Videogames.css"
import { Hobbies } from "../Hobbies/Hobbies"

export const Videogames = () => {
    const data = Hobbies;

    return(
        <div id="videogames" className="container">
            <h2>TOP VIDEOJUEGOS</h2>
            {data.videogames.map((videogame) =>
                <div key={videogame.name} id="vg-card">
                    <img id="vg-img" src={videogame.image} alt={videogame.image}/>
                    <h3>{videogame.name}</h3>
                    <p>{videogame.type}</p>
                </div>
            )}
        </div>
    )
}