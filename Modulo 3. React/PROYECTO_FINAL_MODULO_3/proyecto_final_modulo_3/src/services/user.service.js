import { updateToken } from "../utils";
import { APIuser } from "./serviceApiUser.js";


// ---> REGISTER
export const registerUser = async(formData) => {
    return APIuser.post("/users/register", formData, {
        headers: {"Content-Type": "multipart/form-data"},
    })
    .then((res) => res)
    .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> LOGIN
export const loginUserService = async (formData) => {
    return APIuser.post("/users/login", formData)
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> CHECK CODE
export const checkCodeConfirmationUser = async (formData) => {
    return APIuser.patch("/users/check", formData)
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> RESEND
export const resendCodeConfirmationUser = async (formData) => {
    return APIuser.patch("/users/resend", formData)
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> AUTOLOGIN
export const autologinUser = async (formData) => {
    return APIuser.post("/users/login/autologin", formData)
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> CONTRASEÑA OLVIDADA SIN ESTAR LOGUEADO
export const forgotPasswordUser = async (formData) => {
    return APIuser.patch("/users/forgotpassword", formData)
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> DELETE USER
export const deleteUserService = async () => {
    return APIuser.delete("/users/delete", {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> UPDATE USER
export const updateUser = async (formData) => {
    return APIuser.patch("/users/update/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`,
        },
        })
        .then((res) => res)
        .catch((error) => error);
};

//!-----------------------------------------------------------------

// ---> CHANGE PASSWORD CUANDO ESTAS LOGUEADO
export const changePasswordUserToken = async (formData) => {
    return APIuser.patch("/users/changepassword", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
        })
        .then((res) => res)
        .catch((error) => error);
};