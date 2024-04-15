import "./Experience.css";

export const Experience = ({ experience }) => {
    return (
        <div>
            <div className="experience card">
                {experience.map((item) => {
                return (
                    <div key={name}>
                    <h4 className="name">📁 {item.name}</h4>
                    <p>{item.where}</p>
                    <p>{item.date}</p>
                    <p>{item.description}</p>
                    </div>
                );
                })}
            </div>
        </div>
    );
};