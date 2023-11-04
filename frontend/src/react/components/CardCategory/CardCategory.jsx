import styles from "./CardCategory.module.scss";

export const CardCategory = ({ categoryTitle }) => {
	return (
		<div className={styles.wrapper}>
			<h4 className={styles.category}>Каталог товаров</h4>
			<div className={styles.body}>
				<h3 className={styles.title}>{categoryTitle}</h3>
				<span className={styles.counter}>10342 товаров</span>
			</div>
		</div>
	);
};
