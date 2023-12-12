import styles from "./Container.module.scss";

export const Container = ({ children, isAllowedRoles }) => (
	<div
		className={
			isAllowedRoles ? `${styles.wrapper} paddingPrivatePage` : `${styles.wrapper}`
		}
	>
		{children}
	</div>
);
