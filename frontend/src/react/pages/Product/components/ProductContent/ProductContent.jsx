import { ProductDetails } from "../../../../components";
// import { ProductSpec } from "../ProductSpec/ProductSpec";
import styles from "./ProductContent.module.scss";

export const ProductContent = ({ product }) => {
	const { title, specs, publicId, previewImageUrl } = product;

	return (
		<div className={styles.product}>
			<div className={styles.productHeader}>
				<h1 className={styles.productTitle}>{title}</h1>
			</div>
			<div className={styles.productBody}>
				<div className={`${styles.productInnerWrapper} ${styles.image}`}>
					<img src={previewImageUrl} alt="product_image" />
				</div>
				<div className={`${styles.productInnerWrapper} ${styles.specs}`}>
					<div className={styles.productSpecsRow}>
						<p className={styles.productTextId}>ID: {publicId}</p>
					</div>
					<div className={styles.productSpecsRow}>
						<h4 className={styles.productSpecsTitle}>Характеристики</h4>
					</div>
					<ul className={styles.productSpecsList}>
						{specs}
						{/* <ProductSpec title="Производитель:" description="ASUS" />
						<ProductSpec
							title="Код производителя:"
							description="ROG-STRIX-RTX4070TI-O12G-GAMING"
						/>
						<ProductSpec title="Производитель видеопроцессора:" description="NVIDIA" />
						<ProductSpec title="Серия:" description="GeForce RTX 4070TI" /> */}
					</ul>
				</div>
				<div className={`${styles.productInnerWrapper} ${styles.productDetails}`}>
					<ProductDetails product={product} />
				</div>
			</div>
		</div>
	);
};
