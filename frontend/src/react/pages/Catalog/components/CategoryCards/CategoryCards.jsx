import { CategoryCard } from "../CategoryCard/CategoryCard";
import styles from "./CategoryCards.module.scss";

export const CategoryCards = () => {
	return (
		<div className={styles.wrapper}>
			<CategoryCard categoryTitle={"Комплектующие для ПК"} />
			<CategoryCard categoryTitle={"Периферия"} />
			<CategoryCard categoryTitle={"Серверное оборудование"} />
		</div>
	);
};
