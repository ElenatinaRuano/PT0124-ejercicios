import axios from 'axios';
import { updateToken } from '../utils';


// Las headers de nuestro servicio
const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${updateToken()}`,
};

// Llamamos al servicio --> url del backend
export const APIuser = axios.create({
    //Este puerto lo sacamos del proyecto de backend del modulo 2
    baseURL: `http://localhost:8080/api/v1`,
    headers: APIHeaders,
    timeout: 6000,
});