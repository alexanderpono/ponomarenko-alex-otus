import React from 'react';
import styles from './EditCategoryForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorFields } from 'src/features/forms/forms.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { IAppController, NEW_CATEGORY_ID } from 'src/app/AppController.types';
import { Category } from 'src/entities/Category';

interface EditCategoryFormProps {
    initialValues: Category;
    initialErrors: ErrorFields<Category>;
    ctrl: IAppController;
}
export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ initialValues, initialErrors, ctrl }) => {
    const language = useSelector(appSelector.language);

    const translations = i18n[language].editProductForm;
    const errTranslations = i18n[language].errors;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length)
    });
    const formik = useFormik({
        initialValues,
        onSubmit: ctrl.onEditCategorySubmit,
        validationSchema,
        initialErrors,
        enableReinitialize: true
    });

    return (
        <form className={styles.EditCategoryForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>ID</span>
                <div className={styles.input}>
                    {formik.values.id === NEW_CATEGORY_ID ? 'New category' : formik.values.id}
                </div>
                {formik.errors.id && <div className={styles.error}>{formik.errors.id}</div>}
            </label>

            <label>
                <span>name</span>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}
            </label>

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
            </div>
        </form>
    );
};
