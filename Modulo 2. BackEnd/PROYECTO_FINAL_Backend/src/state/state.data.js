//Declaramos una variable iniciada en false por defecto
//* ---> Esto se debe a que en principio el mail evidentemente no esta enviado. Cambiaremos el estado a true cuando enviemos el mail
let testEmailSend = false;

const setTestEmailSend = (data) => {
    testEmailSend = data;
};

const getTestEmailSend = () => {
    return testEmailSend;
};

module.exports = { setTestEmailSend, getTestEmailSend };