import { ProductDetails } from "../../../../components";
// import { ProductSpec } from "../ProductSpec/ProductSpec";
import styles from "./ProductContent.module.scss";

export const ProductContent = ({ product }) => {
	return (
		<div className={styles.product}>
			<div className={styles.productHeader}>
				<h1 className={styles.productTitle}>{product.title}</h1>
			</div>
			<div className={styles.productBody}>
				<div className={`${styles.productInnerWrapper} ${styles.image}`}>
					<img src={product.previewImageUrl} alt="product_image" />
				</div>
				<div className={`${styles.productInnerWrapper} ${styles.specs}`}>
					<div className={styles.productSpecsRow}>
						<p className={styles.productTextId}>ID: {product.publicId}</p>
					</div>
					<div className={styles.productSpecsRow}>
						<h4 className={styles.productSpecsTitle}>Характеристики</h4>
					</div>
					<ul className={styles.productSpecsList}>
						{product.specs}
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
					<ProductDetails price={product.price} />
				</div>
			</div>
		</div>
	);
};
