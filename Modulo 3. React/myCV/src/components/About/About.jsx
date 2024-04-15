import "./About.css";

export const About = ({ about }) => {
    return(
        <div>
            <h2>Un poco sobre mi</h2>
            <div className="card">
                {about.aboutMe.map((item) =>
            <p key={item}>{item.info}</p>)}
            </div>
        </div>
    )
}