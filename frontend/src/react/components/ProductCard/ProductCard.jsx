import { ProductInfo } from "../ProductInfo/ProductInfo";
import { ProductActions } from "../ProductActions/ProductActions";
import styles from "./ProductCard.module.scss";

export const ProductCard = ({ product }) => {
	const { id, title, specs, publicId, previewImageUrl } = product;

	return (
		<li className={styles.card}>
			<div className={styles.card__left}>
				<ProductInfo
					title={title}
					specs={specs}
					publicId={publicId}
					productId={id}
					previewImageUrl={previewImageUrl}
				/>
			</div>
			<div className={styles.card__right}>
				<ProductActions product={product} />
			</div>
		</li>
	);
};
