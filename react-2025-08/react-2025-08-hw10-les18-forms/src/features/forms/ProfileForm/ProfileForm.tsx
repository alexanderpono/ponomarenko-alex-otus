import React, { useContext } from 'react';
import { ProfileFormValues } from './ProfileForm.types';
import styles from './ProfileForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';

interface ProfileFormProps {
    initialValues: ProfileFormValues;
    onSubmit: (values: ProfileFormValues) => void;
}
export const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onSubmit }) => {
    const { language, i18n } = useContext(I18nContext);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required').max(20, 'Name should be max 20 characters'),
        about: Yup.string().required('This field is required').max(32, 'About should be max 32 characters')
    });
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values);
        },
        validationSchema
    });

    const translations = i18n[language].profileForm;
    return (
        <form className={styles.ProfileForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>{translations.name}</span>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
            </label>
            {formik.errors.name && <div>{formik.errors.name}</div>}

            <label>
                <span>{translations.about}</span>
                <input type="text" name="about" onChange={formik.handleChange} value={formik.values.about} />
            </label>
            {formik.errors.about && <div>{formik.errors.about}</div>}

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
                <button>{translations.cancel}</button>
            </div>
        </form>
    );
};
