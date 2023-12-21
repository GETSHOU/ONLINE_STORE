import styles from "./ProductCreatorForm.module.scss";

export const ProductCreatorForm = ({ children }) => {
	return <div className={styles.formWrapper}>{children}</div>;
};
