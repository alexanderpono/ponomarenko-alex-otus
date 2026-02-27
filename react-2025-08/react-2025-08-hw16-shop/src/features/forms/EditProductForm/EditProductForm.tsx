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
    const categories = useSelector(appSelector.categories);

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
                <input type="file" name="photo" onChange={formik.handleChange} value={''} />
            </label>
            {formik.errors.photo && <div className={styles.error}>{formik.errors.photo}</div>}

            <label>
                <span>{translations.price}</span>
                <input type="text" name="price" onChange={formik.handleChange} value={formik.values.price} />
            </label>
            {formik.errors.price && <div className={styles.error}>{formik.errors.price}</div>}

            <label>
                <span>{translations.name}</span>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
            </label>
            {formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}

            <label>
                <span>{translations.category}</span>
                <select name="type" onChange={formik.handleChange}>
                    {categories.map((category) => (
                        <option value={category.name} selected={category.name === formik.values.type}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>
            {formik.errors.type && <div className={styles.error}>{formik.errors.type}</div>}

            <label>
                <span>{translations.description}</span>
                <input type="text" name="desc" onChange={formik.handleChange} value={formik.values.desc} />
            </label>
            {formik.errors.desc && <div className={styles.error}>{formik.errors.desc}</div>}

            <div className={styles.buttons}>
                <span>&nbsp;</span>
                <button type="submit">{translations.submit}</button>
                <button onClick={ctrl.onEditProductCancelClick}>{translations.cancel}</button>
            </div>
        </form>
    );
};
