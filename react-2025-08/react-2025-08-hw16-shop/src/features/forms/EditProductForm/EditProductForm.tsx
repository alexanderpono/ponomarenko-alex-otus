import React from 'react';
import styles from './EditProductForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorFields } from 'src/features/forms/forms.types';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { IAppController } from 'src/app/AppController.types';
import { Product } from 'src/entities/Product';

interface EditProductFormProps {
    initialValues: Product;
    initialErrors: ErrorFields<Product>;
    ctrl: IAppController;
}
export const EditProductForm: React.FC<EditProductFormProps> = ({ initialValues, initialErrors, ctrl }) => {
    const language = useSelector(appSelector.language);

    const translations = i18n[language].editProductForm;
    const errTranslations = i18n[language].errors;
    const validationSchema = Yup.object().shape({
        price: Yup.number().moreThan(0, errTranslations.mustBePositive),
        name: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        type: Yup.string().required(errTranslations.required).max(32, errTranslations.max32Length),
        desc: Yup.string().max(2048, 'Should be max 2048 characters')
    });
    const formik = useFormik({
        initialValues,
        onSubmit: ctrl.onEditProductSubmit,
        validationSchema,
        initialErrors
    });

    return (
        <form className={styles.EditProductForm} onSubmit={formik.handleSubmit}>
            <label>
                <span>{translations.image}</span>
                <input type="file" name="photo" onChange={formik.handleChange} value={formik.values.photo} />
                {formik.errors.photo && <div className={styles.error}>{formik.errors.photo}</div>}
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
                <input type="text" name="type" onChange={formik.handleChange} value={formik.values.type} />
                {formik.errors.type && <div className={styles.error}>{formik.errors.type}</div>}
            </label>

            <label>
                <span>{translations.description}</span>
                <input type="text" name="desc" onChange={formik.handleChange} value={formik.values.desc} />
                {formik.errors.desc && <div className={styles.error}>{formik.errors.desc}</div>}
            </label>

            <div>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
                <button onClick={ctrl.onEditProductCancelClick}>{translations.cancel}</button>
            </div>
        </form>
    );
};
