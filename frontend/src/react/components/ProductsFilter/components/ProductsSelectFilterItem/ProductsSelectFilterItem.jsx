import styles from "./ProductsSelectFilterItem.module.scss";

export const ProductsSelectFilterItem = ({ id, label, checked, handleToggle }) => {
	return (
		<li className={styles.item}>
			<label className={styles.label}>
				{label}
				<input
					className={styles.input}
					type="checkbox"
					value={id}
					checked={checked.indexOf(id) !== -1}
					onChange={() => handleToggle(id)}
				/>
				<span className={styles.checkmark}></span>
			</label>
		</li>
	);
};
