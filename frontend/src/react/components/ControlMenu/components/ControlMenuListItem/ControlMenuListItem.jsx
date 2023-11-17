import { Link } from "react-router-dom";
import styles from "./ControlMenuListItem.module.scss";

export const ControlMenuListItem = ({ link, text, icon, onLogout }) => {
	return (
		<li className={styles.item}>
			{link ? (
				<Link to={link} className={styles.itemAction}>
					<div className={styles.itemInnerWrapper}>
						<div className={styles.itemIconWrapper}>{icon}</div>
						<div className={styles.itemTextWrapper}>
							<span className={styles.itemText}>{text}</span>
						</div>
					</div>
				</Link>
			) : (
				<button type="button" className={styles.itemAction} onClick={onLogout}>
					<div className={styles.itemInnerWrapper}>
						<div className={styles.itemIconWrapper}>{icon}</div>
						<div className={styles.itemTextWrapper}>
							<span className={styles.itemText}>{text}</span>
						</div>
					</div>
				</button>
			)}
		</li>
	);
};
