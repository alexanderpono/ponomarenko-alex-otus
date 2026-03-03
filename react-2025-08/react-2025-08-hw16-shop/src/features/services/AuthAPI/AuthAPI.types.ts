export interface RegisterBody {
    email: string;
    password: string;
    commandId: string;
}

export interface AuthResult {
    token: string;
}
