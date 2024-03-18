const bcrypt = require("bcrypt"); // para encryptar informacion
const validator = require("validator"); /// nos sirve para validad info
const mongoose = require("mongoose");


//! ---> CREACION DEL MODELO DE USUARIO CON MONGOOSE

const UserSchema = new mongoose.Schema(
    //Iniciamos definiendo los datos

    {
        email: { 
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validator.isEmail, "El mail no es valido"], // en caso de no ser un email valido ---> envia el mensaje de error
            },

        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            },
        
        password: {
            type: String,
            required: true,
            trim: true,
            validate: [validator.isStrongPassword, "La contraseña debe contener minimo 8 caracteres , minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"], 
            },

        gender: {
            type: String,
            enum: ["masculino", "femenino", "otro"],
            required: true,
            },

        rol: {
            type: String,
            enum: ["admin", "user", "superadmin"],
            default: "user",
            },

        confirmationCode: {
            type: Number,
            required: true,
            },

        check: {
            type: Boolean,
            default: false,
            },

        image: {
            type: String,
            },
        
        regionsFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Region" }],
        championsFav: [{ type: mongoose.Schema.Types.ObjectId, ref: "Champion" }],
        blockedByApp: { type: Boolean, default: false },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },

    {
        timestamps: true,
    }
);


UserSchema.pre("save", async function (next){
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
        // el next puede lanzar al log o puede decir que continuemos
    } catch (error) {
        next("Ha habido un error al introducir la contraseña", error);
    }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;