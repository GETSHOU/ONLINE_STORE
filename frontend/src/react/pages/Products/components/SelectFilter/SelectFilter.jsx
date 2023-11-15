import { SelectFilterItem } from "../SelectFilterItem/SelectFilterItem";
import styles from "./SelectFilter.module.scss";

export const SelectFilter = ({ title, checked, data, handleToggle }) => {
	return (
		<li className={styles.select}>
			<div className={styles.selectName}>{title}</div>
			<ul className={styles.selectList}>
				{data.map(({ id, name }) => {
					return (
						<SelectFilterItem
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
