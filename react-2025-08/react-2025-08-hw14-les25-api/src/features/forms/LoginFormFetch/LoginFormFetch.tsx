import React from 'react';
import styles from 'src/features/forms/LoginForm/LoginForm.scss';
import { useFormik } from 'formik';
import { ErrorFields } from 'src/features/forms/forms.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { IAppController } from 'src/app/AppController.types';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';
import { AuthResult } from 'src/features/services/AuthAPI/AuthAPI.types';
import { COMMAND_ID, getApiUrl } from 'src/constants/config';
import { CONTENT_JSON, HTTP_OK } from 'src/constants/API';

interface LoginFormProps {
    initialValues: LoginFormValues;
    ctrl: IAppController;
    initialErrors: ErrorFields<LoginFormValues>;
    isRegistering: boolean;
}
export const LoginFormFetch: React.FC<LoginFormProps> = ({ initialValues, initialErrors, ctrl }) => {
    const language = useSelector(appSelector.language);
    const apiErrorMessage = useSelector(appSelector.apiErrorMessage);

    const isRegistering = true;
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            fetch(getApiUrl() + '/signup', {
                method: 'POST',
                headers: {
                    'Content-type': CONTENT_JSON
                },
                body: JSON.stringify({ email: values.login, password: values.password, commandId: COMMAND_ID })
            })
                .then((response: Response) => {
                    return response.json().then((result) => {
                        if (response.status !== HTTP_OK) {
                            return Promise.reject(result);
                        } else {
                            return result;
                        }
                    });
                })
                .then((result: AuthResult) => {
                    ctrl.getAppStateManager().apiErrorMessage('Успешная регистрация ' + result?.profile?.email);
                })
                .catch(ctrl.onLoginSubmitCatch);
        },
        initialErrors,
        validateOnChange: false,
        validateOnBlur: false
    });

    const translations = i18n[language].loginForm;
    return (
        <form className={styles.LoginForm} onSubmit={formik.handleSubmit}>
            <div className={styles.loginRegister}>Регистрация при помощи fetch API</div>

            <label>
                <span>{translations.login}</span>
                <input type="text" name="login" onChange={formik.handleChange} value={formik.values.login} />
                {formik.errors.login && <div className={styles.error}>{formik.errors.login}</div>}
            </label>

            <label>
                <span>{translations.password}</span>
                <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}
            </label>

            {apiErrorMessage && (
                <div className={styles.error}>
                    {apiErrorMessage}
                    <br />
                    <br />
                </div>
            )}

            <div>
                <span>&nbsp;</span>
                <button type="submit">{isRegistering ? translations.register : translations.submit}</button>
            </div>
        </form>
    );
};
