import React from 'react';
import { UpdatePasswordFormValues } from './UpdatePasswordForm.types';
import styles from './UpdatePasswordForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorFields } from 'src/features/forms/forms.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { IAppController } from 'src/app/AppController.types';

interface UpdatePasswordFormProps {
    initialValues: UpdatePasswordFormValues;
    // onSubmit: (values: UpdatePasswordFormValues) => void;
    initialErrors: ErrorFields<UpdatePasswordFormValues>;
    ctrl: IAppController;
}
export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ initialValues, ctrl, initialErrors }) => {
    const language = useSelector(appSelector.language);
    const apiErrorMessage = useSelector(appSelector.apiErrorMessage);
    const errTranslations = i18n[language].errors;

    const validationSchema = Yup.object().shape({
        password: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        newPassword: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length)
    });
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            ctrl.onUpdatePasswordSubmit(values);
        },
        validationSchema,
        initialErrors,
        enableReinitialize: true
    });

    const translations = i18n[language].updatePasswordForm;
    return (
        <form className={styles.UpdatePasswordForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>{translations.password}</span>
                <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}
            </label>

            <label>
                <span>{translations.newPassword}</span>
                <input
                    type="password"
                    name="newPassword"
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                />
                {formik.errors.newPassword && <div className={styles.error}>{formik.errors.newPassword}</div>}
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
                <button type="submit">{translations.submit}</button>
                <button onClick={ctrl.onUpdatePasswordCloseClick}>{translations.cancel}</button>
            </div>
        </form>
    );
};
