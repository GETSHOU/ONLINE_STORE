import { Comments } from "../../components";
import { ProductContent } from "./components/ProductContent/ProductContent";
import styles from "./Product.module.scss";

export const Product = () => {
	return (
		<div className={styles.wrapper}>
			<ProductContent />
			<Comments />
		</div>
	);
};
