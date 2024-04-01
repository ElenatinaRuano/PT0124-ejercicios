import "./CardCharacter.css";


export const CardCharacter = ({id, name, image, status, origin}) => {


    return (
        <div id="card">
            <div key={id}>
                <img src={image} alt={name}/>
                <h2>{name}</h2>
                <p>{status}</p>
                <p>{origin}</p>
            </div>
        </div>
    )
}