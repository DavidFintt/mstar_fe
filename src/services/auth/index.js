import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'Content-Type': 'application/json'
    }
})

class AuthService {
    async login(data) {
        try{
            const response = await api.post('/login/', data);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            return error.response.data
        } 

    }

    async register(data) {
        try{
            const response = await api.post('/users/register/', data);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            return error.response.data
        } 

    }

}

export default AuthService;