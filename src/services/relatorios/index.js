import axios from "axios";
import api from "../interceptor";

const token = localStorage.getItem("access_token");

class RelatorioService {
    async createPdf(data) {
        try{
            const response = await api.post('/relatorio/pdf/', data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio.pdf');
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link);
            return response
        } catch (error) {
            return error.response.data
        } 

    }

}

export default RelatorioService;