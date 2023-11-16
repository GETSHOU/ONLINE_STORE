import styles from "./ProductSpec.module.scss";

export const ProductSpec = ({ title, description }) => {
	return (
		<li className={styles.spec}>
			<div className={styles.specInnerWrapper}>
				<span className={`${styles.specText} ${styles.specTitle}`}>{title}</span>
				<span className={`${styles.dottedLine}`}>
					<span>.............................................................</span>
				</span>
			</div>
			<div className={styles.specInnerWrapper}>
				<span className={`${styles.specText} ${styles.specDesc}`}>{description}</span>
			</div>
		</li>
	);
};
