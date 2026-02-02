import React, { useContext } from 'react';
import { ProfileFormValues } from './ProfileForm.types';
import styles from './ProfileForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';
import { ErrorFields } from 'src/features/forms/forms.types';

interface ProfileFormProps {
    initialValues: ProfileFormValues;
    onSubmit: (values: ProfileFormValues) => void;
    initialErrors: ErrorFields<ProfileFormValues>;
}
export const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onSubmit, initialErrors }) => {
    const { language, i18n } = useContext(I18nContext);
    const errTranslations = i18n[language].errors;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        about: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length)
    });
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values);
        },
        validationSchema,
        initialErrors
    });

    const translations = i18n[language].profileForm;
    return (
        <form className={styles.ProfileForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>{translations.name}</span>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
            </label>

            <label>
                <span>{translations.about}</span>
                <input type="text" name="about" onChange={formik.handleChange} value={formik.values.about} />
                {formik.errors.about && <div className={styles.error}>{formik.errors.about}</div>}
            </label>

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
                <button>{translations.cancel}</button>
            </div>
        </form>
    );
};
