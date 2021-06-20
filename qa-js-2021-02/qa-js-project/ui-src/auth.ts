export const login = (name: string) => {
    localStorage.setItem('user', name);
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getUserSession = () => {
    const login = localStorage.getItem('user');
    return login;
};

export const isLoggedIn = () => {
    const login = getUserSession();
    return Boolean(login);
};
