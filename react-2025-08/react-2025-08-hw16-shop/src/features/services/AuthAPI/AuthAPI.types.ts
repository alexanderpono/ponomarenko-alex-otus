export interface RegisterParams {
    email: string;
    password: string;
}

export interface AuthResult {
    token: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

interface ErrorInfo {
    message: string;
}

export interface AuthErrorAnswer {
    errors: ErrorInfo[];
}
