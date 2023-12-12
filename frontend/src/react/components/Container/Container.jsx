import styles from "./Container.module.scss";

export const Container = ({ children, isAdminOrModerator }) => (
	<div
		className={
			!isAdminOrModerator ? `${styles.wrapper}` : `${styles.wrapper} paddingPrivatePage`
		}
	>
		{children}
	</div>
);
