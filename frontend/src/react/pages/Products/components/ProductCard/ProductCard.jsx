import { ProductDetails, ProductInfo } from "../../../../components";
import styles from "./ProductCard.module.scss";

export const ProductCard = ({ product }) => {
	const { id, title, specs, publicId, previewImageUrl } = product;

	return (
		<li className={styles.card}>
			<div className={styles.cardInnerWrapper}>
				<ProductInfo
					title={title}
					specs={specs}
					publicId={publicId}
					productId={id}
					previewImageUrl={previewImageUrl}
				/>
			</div>
			<div className={`${styles.cardInnerWrapper} ${styles.actions}`}>
				<ProductDetails product={product} />
			</div>
		</li>
	);
};
