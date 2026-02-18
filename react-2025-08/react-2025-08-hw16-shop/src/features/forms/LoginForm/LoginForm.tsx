import React from 'react';
import { LoginFormValues } from './LoginForm.types';
import styles from './LoginForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorFields } from 'src/features/forms/forms.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';

interface LoginFormProps {
    initialValues: LoginFormValues;
    onSubmit: (values: LoginFormValues) => void;
    initialErrors: ErrorFields<LoginFormValues>;
    isRegistering: boolean;
}
export const LoginForm: React.FC<LoginFormProps> = ({ initialValues, onSubmit, initialErrors, isRegistering }) => {
    const language = useSelector(appSelector.language);
    const errTranslations = i18n[language].errors;

    const validationSchema = Yup.object().shape({
        login: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        password: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        repeatPassword: isRegistering
            ? Yup.string()
                  .required(errTranslations.required)
                  .max(32, errTranslations.max32Length)
                  .oneOf([Yup.ref('password')], errTranslations.passwordsMustBeEqual)
            : undefined
    });

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        },
        validationSchema,
        initialErrors
    });

    const translations = i18n[language].loginForm;
    return (
        <form className={styles.LoginForm} onSubmit={formik.handleSubmit}>
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

            {isRegistering && (
                <label>
                    <span>{translations.repeatPassword}</span>
                    <input
                        type="password"
                        name="repeatPassword"
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                    />
                    {formik.errors.repeatPassword && <div className={styles.error}>{formik.errors.repeatPassword}</div>}
                </label>
            )}

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
            </div>
        </form>
    );
};
