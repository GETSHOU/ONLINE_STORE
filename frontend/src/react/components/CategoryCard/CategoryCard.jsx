import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.scss";

export const CategoryCard = ({ id, parentTitle, categoryTitle, isSubcategoriesPage }) => {
	const linkToProductsPage = `/subcategories/${id}/products`;
	const linkToSubcategoriesPage = `/categories/${id}/subcategories`;

	return (
		<div className={styles.card}>
			<Link
				to={isSubcategoriesPage ? linkToProductsPage : linkToSubcategoriesPage}
				className={styles.cardLink}
			>
				<h4 className={styles.cardSection}>
					{!!parentTitle ? parentTitle : "Каталог товаров"}
				</h4>
				<div className={styles.cardBody}>
					<h3 className={styles.cardTitle}>{categoryTitle}</h3>
					<span className={styles.cardCounter}>Количество товаров</span>
				</div>
			</Link>
		</div>
	);
};
