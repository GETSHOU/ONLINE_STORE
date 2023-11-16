import { ProductDetails } from "../../components";
import { ProductSpec } from "./components/ProductSpec/ProductSpec";
import styles from "./Product.module.scss";

export const Product = () => {
	return (
		<div className={styles.product}>
			<div className={styles.productHeader}>
				<h1 className={styles.productTitle}>
					Видеокарта NVIDIA GeForce RTX 4070 Ti ASUS 12Gb
					(ROG-STRIX-RTX4070TI-O12G-GAMING)
				</h1>
			</div>
			<div className={styles.productBody}>
				<div className={`${styles.productInnerWrapper} ${styles.image}`}>
					<img
						src="https://www.regard.ru/api/site/cacheimg/goods/1033571/358"
						alt="product_image"
					/>
				</div>
				<div className={`${styles.productInnerWrapper} ${styles.specs}`}>
					<div className={styles.productSpecsRow}>
						<p className={styles.productTextId}>ID: 573146</p>
					</div>
					<div className={styles.productSpecsRow}>
						<h4 className={styles.productSpecsTitle}>Характеристики</h4>
					</div>
					<ul className={styles.productSpecsList}>
						<ProductSpec title="Производитель:" description="ASUS" />
						<ProductSpec
							title="Код производителя:"
							description="ROG-STRIX-RTX4070TI-O12G-GAMING"
						/>
						<ProductSpec title="Производитель видеопроцессора:" description="NVIDIA" />
						<ProductSpec title="Серия:" description="GeForce RTX 4070TI" />
					</ul>
				</div>
				<div className={`${styles.productInnerWrapper} ${styles.productDetails}`}>
					<ProductDetails price={303000} />
				</div>
			</div>
		</div>
	);
};
