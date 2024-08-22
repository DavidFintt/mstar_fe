
export default function VerifyLogin(){
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.log(error);
    }
}