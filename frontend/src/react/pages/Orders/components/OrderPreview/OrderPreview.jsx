import { Link } from "react-router-dom";
import styles from "./OrderPreview.module.scss";

export const OrderPreview = ({ product, productCount }) => {
	const { id, title, price, publicId, previewImageUrl } = product;

	return (
		<div className={styles.preview}>
			<div className={`${styles.preview__item} ${styles.preview__itemImage}`}>
				<Link to={`/products/${id}`}>
					<img src={previewImageUrl} alt="product_image" />
				</Link>
			</div>
			<div className={`${styles.preview__item} ${styles.preview__itemCenter}`}>
				<p className={styles.preview__textRow}>ID товара: {publicId}</p>
				<p className={styles.preview__textRow}>
					<Link to={`/products/${id}`} className={styles.preview__textLink}>
						{title}
					</Link>
				</p>
			</div>
			<div className={`${styles.preview__item} ${styles.preview__itemPrice}`}>
				{productCount !== 1 && (
					<span className={styles.preview__priceTop}>{price} ₽ / шт.</span>
				)}
				<span className={styles.preview__priceBottom}>
					{price * productCount} ₽ / {productCount} шт.
				</span>
			</div>
		</div>
	);
};
