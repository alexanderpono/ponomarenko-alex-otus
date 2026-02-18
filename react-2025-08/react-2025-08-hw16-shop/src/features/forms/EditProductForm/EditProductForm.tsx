import React, { useContext } from 'react';
import { EditProductFormValues } from './EditProductForm.types';
import styles from './EditProductForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';
import { ErrorFields } from 'src/features/forms/forms.types';

interface EditProductFormProps {
    initialValues: EditProductFormValues;
    initialErrors: ErrorFields<EditProductFormValues>;
    onSubmit: (values: EditProductFormValues) => void;
}
export const EditProductForm: React.FC<EditProductFormProps> = ({ initialValues, initialErrors, onSubmit }) => {
    const { language, i18n } = useContext(I18nContext);

    const translations = i18n[language].editProductForm;
    const errTranslations = i18n[language].errors;
    const validationSchema = Yup.object().shape({
        price: Yup.number().moreThan(0, errTranslations.mustBePositive),
        name: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        category: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        description: Yup.string().max(2048, 'Should be max 2048 characters')
    });
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onSubmit(values);
        },
        validationSchema,
        initialErrors
    });

    return (
        <form className={styles.EditProductForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>{translations.image}</span>
                <input type="file" name="image" onChange={formik.handleChange} value={formik.values.image} />
                {formik.errors.image && <div className={styles.error}>{formik.errors.image}</div>}
            </label>

            <label>
                <span>{translations.price}</span>
                <input type="text" name="price" onChange={formik.handleChange} value={formik.values.price} />
                {formik.errors.price && <div className={styles.error}>{formik.errors.price}</div>}
            </label>

            <label>
                <span>{translations.name}</span>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
            </label>

            <label>
                <span>{translations.category}</span>
                <input type="text" name="category" onChange={formik.handleChange} value={formik.values.category} />
                {formik.errors.category && <div className={styles.error}>{formik.errors.category}</div>}
            </label>

            <label>
                <span>{translations.description}</span>
                <input
                    type="text"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                />
                {formik.errors.description && <div className={styles.error}>{formik.errors.description}</div>}
            </label>

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
                <button>{translations.cancel}</button>
            </div>
        </form>
    );
};
