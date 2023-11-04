import { BiSearch } from "react-icons/bi";
import styles from "./SearchInput.module.scss";

export const SearchInput = ({ searchQuery, onSearch }) => {
	return (
		<div className={styles.wrapper}>
			<input
				className={styles.input}
				type="text"
				placeholder="Поиск..."
				value={searchQuery}
				onChange={onSearch}
			/>
			<BiSearch className="icon iconSearch centeredY" />
		</div>
	);
};
