import "./Education.css";

export const Education = ({ education }) => {
    return (
        <div>
        <div className="education card">
            {education.map((item) => {
            return (
                <div key={name}>
                <p className="name">📕 {item.name}</p>
                <p>{item.where}</p>
                <p>{item.date}</p>
                </div>
            );
            })}
        </div>
        </div>
    );
};