export interface RegisterParams {
    email: string;
    password: string;
}

export interface AuthResult {
    token: string;
    profile?: {
        email: string;
    };
}

export interface LoginParams {
    email: string;
    password: string;
}

interface ErrorInfo {
    message: string;
}

export interface ApiErrorAnswer {
    errors: ErrorInfo[];
}
