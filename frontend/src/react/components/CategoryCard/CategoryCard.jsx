import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.scss";

export const CategoryCard = ({ id, categoryTitle }) => {
	return (
		<div className={styles.card}>
			<Link to={`/categories/${id}`} className={styles.cardLink}>
				<h4 className={styles.cardSection}>Каталог товаров</h4>
				<div className={styles.cardBody}>
					<h3 className={styles.cardTitle}>{categoryTitle}</h3>
					<span className={styles.cardCounter}>10342 товаров</span>
				</div>
			</Link>
		</div>
	);
};
