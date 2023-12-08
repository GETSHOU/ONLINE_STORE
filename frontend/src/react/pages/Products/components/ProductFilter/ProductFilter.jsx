import { useState } from "react";
import { Button } from "../../../../components";
import { SelectFilter } from "../SelectFilter/SelectFilter";
import styles from "./ProductFilter.module.scss";

export const ProductFilter = () => {
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
				<SelectFilter
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
