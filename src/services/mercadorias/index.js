import axios from "axios";

const token = localStorage.getItem("access_token");

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});
class MercadoriaService {
    async tipoMercadoriaRegister(data) {
        try{
            const response = await api.post('/mercadoria/tipo/', data);
            return response
        } catch (error) {
            return error.response.data
        } 

    }

    async tipoMercadoriaLoad(data) {
        try{
            const response = await api.get('/mercadoria/tipo/return/', data);
            return response
        } catch (error) {
            return error.response.data
        } 

    }

    async mercadoriaRegister(data) {
        try{
            const response = await api.post('/mercadoria/register/', data);
            return response
        } catch (error) {
            return error.response.data
        } 

    }

    async mercadoriaLoad(data) {
        try{
            const response = await api.post('/mercadoria/return/', data ? data : {});
            return response
        } catch (error) {
            return error.response.data
        } 

    }

}

export default MercadoriaService;