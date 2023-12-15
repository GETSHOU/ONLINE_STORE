import styles from "./CategoryCreatorForm.module.scss";

export const CategoryCreatorForm = ({ children }) => {
	return <div className={styles.formWrapper}>{children}</div>;
};
