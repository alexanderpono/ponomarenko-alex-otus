import React, { useContext } from 'react';
import { LoginFormValues } from './LoginForm.types';
import styles from './LoginForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';

interface LoginFormProps {
    initialValues: LoginFormValues;
    onSubmit: (values: LoginFormValues) => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ initialValues, onSubmit }) => {
    const { language, i18n } = useContext(I18nContext);

    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Login is required').max(20, 'Should be max 20 characters'),
        password: Yup.string().required('Password is required').max(32, 'Should be max 32 characters')
    });
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values);
        },
        validationSchema
    });

    const translations = i18n[language].loginForm;
    return (
        <form className={styles.LoginForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>{translations.login}</span>
                <input type="text" name="login" onChange={formik.handleChange} value={formik.values.login} />
            </label>
            {formik.errors.login && <div>{formik.errors.login}</div>}

            <label>
                <span>{translations.password}</span>
                <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
            </label>
            {formik.errors.password && <div>{formik.errors.password}</div>}

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
            </div>
        </form>
    );
};
