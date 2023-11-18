import styles from "./AdminContent.module.scss";

export const AdminContent = ({ children, pageTitle }) => {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h2 className={styles.headerTitle}>{pageTitle}</h2>
			</header>
			<main className={styles.content}>{children}</main>
		</div>
	);
};
