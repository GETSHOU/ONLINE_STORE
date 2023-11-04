import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

export const Logo = () => {
	return (
		<div className={styles.wrapper}>
			<Link to="/" className={styles.logotype}>
				<span className={`highlightedText ${styles.logotypeElem}`}>И</span>
				<span className={styles.logotypeElem}>М</span>
			</Link>
		</div>
	);
};
