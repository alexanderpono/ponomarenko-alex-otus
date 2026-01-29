import React, { useContext } from 'react';
import { RegisterFormValues } from './RegisterForm.types';
import styles from './RegisterForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';

interface RegisterFormProps {
    initialValues: RegisterFormValues;
    onSubmit: (values: RegisterFormValues) => void;
}
export const RegisterForm: React.FC<RegisterFormProps> = ({ initialValues, onSubmit }) => {
    const { language, i18n } = useContext(I18nContext);

    const translations = i18n[language].registerForm;
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

            <label>
                <span>{translations.repeatPassword}</span>
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
