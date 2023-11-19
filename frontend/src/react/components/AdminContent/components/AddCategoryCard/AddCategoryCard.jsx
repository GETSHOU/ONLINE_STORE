import { TbLayoutGridAdd } from "react-icons/tb";
import styles from "./AddCategoryCard.module.scss";

export const AddCategoryCard = ({ title, handleAdd }) => {
	return (
		<button type="button" className={styles.button} onClick={handleAdd}>
			<TbLayoutGridAdd className="icon iconAddCategory" />
			<h4 className={styles.buttonTitle}>{title}</h4>
		</button>
	);
};
