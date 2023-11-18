import { TbLayoutGridAdd } from "react-icons/tb";
import styles from "./AddCategory.module.scss";

export const AddCategory = ({ title, action }) => {
	return (
		<button type="button" className={styles.button} onClick={action}>
			<TbLayoutGridAdd className="icon iconAddCategory" />
			<h4 className={styles.buttonTitle}>{title}</h4>
		</button>
	);
};
