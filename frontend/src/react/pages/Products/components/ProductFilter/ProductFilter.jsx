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
	const db_videorads_series = [
		{ id: 11, name: "GeForce RTX 4070 Ti" },
		{ id: 22, name: "GeForce RTX 4090" },
		{ id: 33, name: "Radeon RX 7900 XTX" },
	];

	const handleToggle = value => {
		setChecked(prevValue =>
			prevValue.includes(value)
				? prevValue.filter(v => v !== value)
				: [...prevValue, value],
		);
	};

	console.log(checked);

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
				<SelectFilter
					title="Серия"
					checked={checked}
					data={db_videorads_series}
					handleToggle={handleToggle}
				/>
			</ul>
			<Button
				type="button"
				text="Показать"
				onChange={() => {
					console.log(checked);
				}}
			/>
		</aside>
	);
};
