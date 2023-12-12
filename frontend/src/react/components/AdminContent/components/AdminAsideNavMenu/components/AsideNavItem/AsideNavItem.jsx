import { NavLink } from "react-router-dom";
import styles from "./AsideNavItem.module.scss";

export const AsideNavItem = ({ link, text, icon, onLogout }) => {
	return (
		<li className={styles.item}>
			{link ? (
				<NavLink to={link} className={styles.itemAction}>
					<div className={styles.itemInnerWrapper}>
						<div className={styles.itemIconWrapper}>{icon}</div>
						<div className={styles.itemTextWrapper}>
							<span className={styles.itemText}>{text}</span>
						</div>
					</div>
				</NavLink>
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
