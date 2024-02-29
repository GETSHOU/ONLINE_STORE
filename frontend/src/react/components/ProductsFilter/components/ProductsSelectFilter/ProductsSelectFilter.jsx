import { ProductsSelectFilterItem } from "../ProductsSelectFilterItem/ProductsSelectFilterItem";
import styles from "./ProductsSelectFilter.module.scss";

export const ProductsSelectFilter = ({ title, checked, data, handleToggle }) => {
	return (
		<li className={styles.select}>
			<div className={styles.selectName}>{title}</div>
			<ul className={styles.selectList}>
				{data.map(({ id, name }) => {
					return (
						<ProductsSelectFilterItem
							key={id}
							id={id}
							label={name}
							checked={checked}
							handleToggle={handleToggle}
						/>
					);
				})}
			</ul>
		</li>
	);
};
