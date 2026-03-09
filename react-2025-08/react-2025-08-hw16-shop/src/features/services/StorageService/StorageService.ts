export class StorageService {
    getToken = () => {
        return localStorage.getItem('token');
    };

    setToken = (token: string) => {
        localStorage.setItem('token', token);
    };

    getLogin = () => {
        return localStorage.getItem('login');
    };

    setLogin = (login: string) => {
        localStorage.setItem('login', login);
    };
}
