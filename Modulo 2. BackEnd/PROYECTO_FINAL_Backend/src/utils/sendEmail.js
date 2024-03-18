const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestEmailSend } = require("../state/state.data");

const sendEmail = (userEmail, name, confirmationCode) => {
    /**Primero reseteo el estado a false ---> es el estado inicial */
    setTestEmailSend(false);

    //A partir de aqui vamos a usar nodemailer para enviar el correo con el codigo de confirmación
    const emailEnv = process.env.EMAIL; // ---> este es el mail desde donde se enviará el correo
    const password = process.env.PASSWORD; // ---> esta es la contraseña que hemos generado en nodemailer

    const transporter = nodemailer.createTransport({ //Aqui usamos el metodo transport de nodemailer para prepara el gmail
        service: "gmail",
        auth: {
            user: emailEnv,
            pass: password,
        },
    });

    const mailOptions = { //Aqui configuramos el contenido del mail
        from: emailEnv,
        to: userEmail,
        subject: "Codigo de confirmación",
        text: `Tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
    };

    //Hacemos el envio del mail y capturamos los posibles errores
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(404).json({
                user: userSave,
                confirmationCode: "✉❌ Se ha producido un error, reenviar el codigoo de confirmación ❌✉",
            });
        }

        console.log("💌 El mail se ha enviado con exito: " + info.response);
        setTestEmailSend(true);
    });
};

module.exports = sendEmail;