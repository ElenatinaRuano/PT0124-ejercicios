const randomCode = () => {
    let code = Math.floor(Math.random() * 899999 + 100000);  // ---> genera un numero de  6 cifras entre 100001 y 999999
    return code;
};

module.exports = randomCode;