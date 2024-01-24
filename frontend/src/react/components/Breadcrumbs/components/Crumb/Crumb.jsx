import { Link } from "react-router-dom";
import styles from "./Crumb.module.scss";

export const Crumb = ({ name, link }) => {
	return (
		<li className={link ? `${styles.item}` : `${styles.item} ${styles.itemActive}`}>
			{link ? (
				<Link to={link} className={styles.itemName}>
					{name}
				</Link>
			) : (
				<span className={styles.itemName}>{name}</span>
			)}
		</li>
	);
};
