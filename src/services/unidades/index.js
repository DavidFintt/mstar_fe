import axios from "axios";
import api from "../interceptor";

const token = localStorage.getItem("access_token");
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