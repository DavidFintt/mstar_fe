import axios from "axios";

const token = localStorage.getItem("access_token");

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});
class UnidadeService {
    async unidadeRegister(data) {
        try{
            const response = await api.post('/unidade/register/', data);
            return response
        } catch (error) {
            return error.response.data
        } 

    }

    async load(data) {
        try{
            const response = await api.get('/unidade/return/', data);
            return response
        } catch (error) {
            return error.response.data
        } 

    }

}

export default UnidadeService;