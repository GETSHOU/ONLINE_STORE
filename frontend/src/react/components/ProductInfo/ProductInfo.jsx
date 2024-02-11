import { Link } from "react-router-dom";
import styles from "./ProductInfo.module.scss";

export const ProductInfo = ({ publicId, productId, title, specs, previewImageUrl }) => {
	return (
		<div className={styles.product}>
			<div className={styles.product__image}>
				<Link to={`/products/${productId}`}>
					<img src={previewImageUrl} alt="product_image" />
				</Link>
			</div>
			<div className={styles.product__info}>
				<p className={styles.product__textRow}>ID товара: {publicId}</p>
				<p className={styles.product__textRow}>
					<Link to={`/products/${productId}`} className={styles.product__link}>
						{title}
					</Link>
				</p>
				<p className={styles.product__textRow}>{specs}</p>
			</div>
		</div>
	);
};
