import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoriesTitleSelector } from "../../store/selectors";
import styles from "./CategoryCard.module.scss";

export const CategoryCard = ({ id, parentTitle, categoryTitle, isSubcategoriesPage }) => {
	const categoriesTitle = useSelector(categoriesTitleSelector);

	const linkToProductsPage = `/subcategories/${id}`;
	const linkToSubcategoriesPage = `/categories/${id}`;

	return (
		<div className={styles.card}>
			<Link
				to={isSubcategoriesPage ? linkToProductsPage : linkToSubcategoriesPage}
				className={styles.cardLink}
			>
				<h4 className={styles.cardSection}>
					{!!parentTitle ? parentTitle : categoriesTitle}
				</h4>
				<div className={styles.cardBody}>
					<h3 className={styles.cardTitle}>{categoryTitle}</h3>
					<span className={styles.cardCounter}>Количество товаров</span>
				</div>
			</Link>
		</div>
	);
};
