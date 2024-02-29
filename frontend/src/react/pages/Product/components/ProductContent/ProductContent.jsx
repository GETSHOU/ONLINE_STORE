import { ProductActions } from "../../../../components";
import { ProductContentSkeleton } from "../ProductContentSkeleton/ProductContentSkeleton";
// import { ProductSpec } from "../ProductSpec/ProductSpec";
import styles from "./ProductContent.module.scss";

export const ProductContent = ({ product, serverError, loadingStatus }) => {
	const { specs, publicId, previewImageUrl } = product;

	return (
		<>
			{!loadingStatus ? (
				!serverError && (
					<div className={styles.product}>
						<div className={`${styles.product__info} ${styles.product__left}`}>
							<img src={previewImageUrl} alt="product_image" />
						</div>
						<div className={`${styles.product__info} ${styles.product__center}`}>
							<div className={styles.specs}>
								<div className={styles.specs__row}>
									<p className={styles.specs__top}>ID:{publicId}</p>
								</div>
								<div className={styles.specs__row}>
									<h4 className={styles.specs__center}>Характеристики</h4>
								</div>
								<div className={styles.specs__row}>
									<ul className={styles.specs__bottom}>{specs}</ul>
								</div>
							</div>
						</div>
						<div className={`${styles.product__info} ${styles.product__right}`}>
							<ProductActions product={product} loadingStatus={loadingStatus} />
						</div>
					</div>
				)
			) : (
				<ProductContentSkeleton inline={true} />
			)}
		</>
	);
};
