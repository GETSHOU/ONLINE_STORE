import styles from "./UsersTableTitles.module.scss";

export const UsersTableTitles = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.tableCell}>
				<h4 className={styles.tableTitle}>Имя</h4>
			</div>
			<div className={styles.tableCell}>
				<h4 className={styles.tableTitle}>Почта</h4>
			</div>
			<div className={styles.tableCell}>
				<h4 className={styles.tableTitle}>Дата регистрации</h4>
			</div>
			<div className={styles.tableCell}>
				<h4 className={styles.tableTitle}>Роль</h4>
			</div>
			<div className={styles.tableCell}>
				<h4 className={styles.tableTitle}>Действия</h4>
			</div>
		</div>
	);
};
