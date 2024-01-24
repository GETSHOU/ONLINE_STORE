import styles from "./PageTitle.module.scss";

export const PageTitle = ({ title }) => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
};
