import axios from 'axios';

const BASE_URI = process.env.REACT_APP_BASE ||'http://localhost:5000/api/';
const INVALID_DATA = {
    status: 'error',
    message: 'missing or invalid data'
};

function areRegisterInputsValid({ email, password, repassword }) {
    if (!email || !password || !repassword ) {
        return false;
    }
    return true;
}

function isPasswordValid(password, repassword) {
    return password === repassword;
}

async function serverRequest(url, method, data, headers) {
    try {
        const response = await axios({
            url,
            method,
            data,
            headers
        });
        const responseData = {
            status: 'ok',
            data: response.data.data,
            message: response.data.message
        }
        return responseData;
    }
    catch (error) {
        console.log(error);
        if (error && error.response &&error.response.data) {
            const { message } = error.response.data;
            const responseData = {
                status: 'error',
                message: message
            }
            return responseData;
        }
        return {
            status: 'error',
            message: 'connection error'
        };
    }
}

export const registerUser = async (inputData) => {
    const { password, repassword } = inputData;
    const inputsValidity = areRegisterInputsValid(inputData);
    const passwordMatch = isPasswordValid(password, repassword);
    if (!inputsValidity || !passwordMatch) {
        return INVALID_DATA;
    }
    const url = BASE_URI + 'user';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const fetchCurrentUser = async(token)=>{
    const method = 'GET';
    const url = BASE_URI+'user';
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    };
    const response = await serverRequest(url, method, {}, headers);
    return response;
}

