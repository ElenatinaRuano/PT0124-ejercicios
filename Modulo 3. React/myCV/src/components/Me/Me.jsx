import "./Me.css";

export const Me = ({ me }) => {
    return (
        <div className="me">
            <img src={me.image} alt="" />
            <div className="card">
            <h2>{me.name} {me.surname}</h2>
            <p>🗺️ {me.city} </p>
            <p>🗓️ {me.birthDate}</p>
            <p>
                📧 <a href={"mailto:" + me.email}>elenatinaruano@neoland.com</a>
            </p>
            <p>📱 {me.phone}</p>
            <p>💾 <a href={me.gitHub}>GitHub</a></p>
            </div>
        </div>
    );
};