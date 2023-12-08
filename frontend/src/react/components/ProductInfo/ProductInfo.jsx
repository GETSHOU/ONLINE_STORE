import { Link } from "react-router-dom";
import styles from "./ProductInfo.module.scss";

export const ProductInfo = ({ productId, title, specs, previewImageUrl }) => {
	return (
		<div className={styles.product}>
			<div className={styles.productImage}>
				<Link to={`/products/${productId}`}>
					<img src={previewImageUrl} alt="product_image" />
				</Link>
			</div>
			<div className={styles.productInfo}>
				<p className={styles.productTextRow}>ID товара: "_NONE_"</p>
				<p className={styles.productTextRow}>
					<Link to={`/products/${productId}`} className={styles.productTitleLink}>
						{title}
					</Link>
				</p>
				<p className={styles.productTextRow}>{specs}</p>
			</div>
		</div>
	);
};
