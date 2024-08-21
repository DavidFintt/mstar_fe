import axios from "axios";

const token = localStorage.getItem("access_token");

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
        'Authorization': `Bearer ${token}`
    }
});
class MovimentacoesService {
    async registerEntrada(data) {
        try{
            const response = await api.post('/mercadoria/entrada/register/', data);
            return response
        } catch (error) {
            console.log(error.response)
            return error.response.data
        } 

    }

    async registerSaida(data) {
        try{
            const response = await api.post('/mercadoria/saida/register/', data);
            return response
        } catch (error) {
            console.log(error.response)
            return error.response.data
        } 

    }

    
    async loadEntrada(data) {
        try{
            const response = await api.get('/mercadoria/entrada/return/', data);
            return response
        } catch (error) {
            console.log(error.response)
            return error.response.data
        } 

    }

    async loadSaida(data) {
        try{
            const response = await api.get('/mercadoria/saida/return/', data);
            return response
        } catch (error) {
            console.log(error.response)
            return error.response.data
        } 

    }


}

export default MovimentacoesService;