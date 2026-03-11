import React from 'react';
import styles from './CategoriesPage.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';
import { Category } from 'src/entities/Category';
import { EditCategoryForm } from 'src/features/forms/EditCategoryForm/EditCategoryForm';
import { i18n } from 'src/constants/i18n';

interface CategoriesPageProps {
    ctrl: IAppController;
}
export const CategoriesPage: React.FC<CategoriesPageProps> = ({ ctrl }) => {
    const categories = useSelector(appSelector.categories);
    const curCategoryId = useSelector(appSelector.curCategoryId);
    const editedCategory = useSelector(appSelector.editedCategory);
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].category;
    if (!isUserAuthorized) {
        return <></>;
    }
    return (
        <div className={cn(styles.CategoriesPage)}>
            <div className={styles.categoryList}>
                {categories.length === 0 && (
                    <ul>
                        <li onClick={ctrl.onAddCategoryClick}>+ {translations.addCategory}</li>
                    </ul>
                )}
                {categories.length > 0 && (
                    <ul>
                        <li onClick={ctrl.onAddCategoryClick}>+ {translations.addCategory}</li>
                        {categories.map((category: Category) => (
                            <li
                                key={category.id}
                                onClick={ctrl.onCategoryClick}
                                data-id={category.id}
                                className={cn({ [styles.cur]: category.id === curCategoryId })}
                            >{`${category.name}`}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={styles.curCategory}>
                {!curCategoryId && <div className={styles.nothingSelected}>{translations.noSelected}</div>}
                {!!curCategoryId && (
                    <EditCategoryForm initialValues={editedCategory} initialErrors={{ id: '', name: '' }} ctrl={ctrl} />
                )}
            </div>
        </div>
    );
};
export default CategoriesPage;
