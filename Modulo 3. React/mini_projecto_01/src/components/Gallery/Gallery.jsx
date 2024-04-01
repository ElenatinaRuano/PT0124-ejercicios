import "./Gallery.css";
import { CardCharacter } from "../CardCharacter/CardCharacter";
import { data } from "../../data/data";

const characterList = await data();

export const Gallery = () => {

    return (
        <div id="container-gallery">
            {characterList.map((character) => ( character.status == "Alive" ?
                <CardCharacter 
                    name={character.name} 
                    image={character.image} 
                    key={character.id} 
                    id={character.id}
                    status={character.status}
                    origin={character.origin.name}/>
                
                : ""
            ))}
        </div>
    )
}