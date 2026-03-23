import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './CategoriesPage.scss';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { Category } from 'src/entities/Category';
import { EditCategoryForm } from 'src/features/forms/EditCategoryForm/EditCategoryForm';
import { i18n } from 'src/constants/i18n';

interface CategoriesPageProps {
    ctrl: IAppController;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ ctrl }) => {
    const navigate = useNavigate();
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const categories = useSelector(appSelector.categories);
    const curCategoryId = useSelector(appSelector.curCategoryId);
    const editedCategory = useSelector(appSelector.editedCategory);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].category;

    React.useEffect(() => {
        if (!isUserAuthorized) {
            navigate('/products', { replace: true });
        }
    }, [isUserAuthorized, navigate]);

    if (!isUserAuthorized) {
        return null;
    }

    return (
        <div className={cn(styles.CategoriesPage)}>
            <div className={styles.categoryList}>
                <ul>
                    <li onClick={ctrl.onAddCategoryClick}>+ {translations.addCategory}</li>
                    {categories.map((category: Category) => (
                        <li
                            key={category.id}
                            onClick={ctrl.onCategoryClick}
                            data-id={category.id}
                            className={cn({ [styles.cur]: category.id === curCategoryId })}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.curCategory}>
                {!curCategoryId ? (
                    <div className={styles.nothingSelected}>{translations.noSelected}</div>
                ) : (
                    <EditCategoryForm initialValues={editedCategory} initialErrors={{ id: '', name: '' }} ctrl={ctrl} />
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;
