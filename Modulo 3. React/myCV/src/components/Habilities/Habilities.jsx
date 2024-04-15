import "./Habilities.css"

export const Habilities = ({ languages, habilities}) => {
    return (
        <div className="idiomas">
            <h2>Idiomas</h2>
            <div className="card">
                {languages.map((item) =>
                <div key = {item.index}>
                    <h4>{item.language}</h4>
                    <p>🗣 :  {item.splevel}</p>
                    <p>✍🏻 : {item.wrlevel}</p>
                </div>
            )}
            </div>

            <h2>Otras habilidades</h2>
            <div className="card">
                {habilities.map((item) =>
                <p key={item}>✏ {item}</p>
            )}
            </div>
        </div>
    )
}