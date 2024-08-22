import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.log('Redirecionando para login...');
            navigate('/login');
        }
    }, [navigate]);
}