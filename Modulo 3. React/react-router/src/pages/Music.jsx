import { Hobbies } from "../Hobbies/Hobbies"

export const Music = () => {
    const data = Hobbies;

    return(
        <div id="music" className="container">
            <h2>TOP CANCIONES</h2>
            {data.songs.map((song) =>
                <div key={song.song} id="song-card">
                    <h3>{song.song}</h3>
                    <p>Artista: {song.artist}</p>
                    <p>Youtube: <a>{song.youtube}</a></p>
                </div>
            )}
        </div>
    )
}