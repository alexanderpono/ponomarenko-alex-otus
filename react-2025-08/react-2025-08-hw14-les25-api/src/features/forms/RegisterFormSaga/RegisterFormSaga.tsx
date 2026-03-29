import React from 'react';
import styles from 'src/features/forms/LoginForm/LoginForm.scss';
import { useFormik } from 'formik';
import { ErrorFields } from 'src/features/forms/forms.types';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { IAppController } from 'src/app/AppController.types';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';
import { app } from 'src/store/appReducer';

interface RegisterFormSagaProps {
    initialValues: LoginFormValues;
    ctrl: IAppController;
    initialErrors: ErrorFields<LoginFormValues>;
    isRegistering: boolean;
}
export const RegisterFormSaga: React.FC<RegisterFormSagaProps> = ({ initialValues, initialErrors, ctrl }) => {
    const language = useSelector(appSelector.language);
    const apiErrorMessage = useSelector(appSelector.apiErrorMessage);
    const dispatch = useDispatch();

    const isRegistering = true;
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            dispatch(app.register({ login: values.login, password: values.password }));
        },
        initialErrors,
        validateOnChange: false,
        validateOnBlur: false
    });

    const translations = i18n[language].loginForm;
    return (
        <form className={styles.LoginForm} onSubmit={formik.handleSubmit}>
            <label className={styles.top20}>
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
