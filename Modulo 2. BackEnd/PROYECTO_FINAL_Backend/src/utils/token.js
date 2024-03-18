const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const generateToken = (id, email) => {
    if (!id || !email) {
        throw new Error("😢 Falta información: ID o EMAL 😢");
        }
    
        return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const verifyToken = (token) => {
    if (!token) {
        throw new Error("😢 No se encuentra el TOKEN 😢");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
};



//Exportamos las funciones
module.exports = {
    generateToken,
    verifyToken,
};