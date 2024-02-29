import { useState } from "react";
import { Button } from "../Button/Button";
import { ProductsSelectFilter } from "./components/ProductsSelectFilter/ProductsSelectFilter";
import styles from "./ProductsFilter.module.scss";

export const ProductsFilter = () => {
	const [checked, setChecked] = useState([]);

	const db_vendors = [
		{ id: 1, name: "Gigabyte" },
		{ id: 2, name: "Asus" },
		{ id: 3, name: "ASRock" },
	];

	const handleToggle = value => {
		setChecked(prevValue =>
			prevValue.includes(value)
				? prevValue.filter(v => v !== value)
				: [...prevValue, value],
		);
	};

	const handleClear = () => setChecked([]);

	return (
		<aside className={styles.filter}>
			<h4 className={styles.filterTitle}>Фильтры</h4>
			<ul className={styles.filterList}>
				<ProductsSelectFilter
					title="Производитель"
					checked={checked}
					data={db_vendors}
					handleToggle={handleToggle}
				/>
			</ul>
			<Button type="button" text="Сбросить фильтр" onClick={handleClear} />
		</aside>
	);
};
