import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';

export interface IAppController {
    onAppMount: () => void;
    onThemeChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    onLanguageChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onLoginSubmit: (values: LoginFormValues) => void;
    onSelectLogin: () => void;
    onSelectRegister: () => void;
    onLoginCloseClick: () => void;
}
