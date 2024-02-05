import { ProductDetails, ProductInfoImageSkeleton } from "../../../../components";
// import { ProductSpec } from "../ProductSpec/ProductSpec";
import styles from "./ProductContent.module.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductContent = ({ product, loadingStatus }) => {
	const { specs, publicId, previewImageUrl } = product;

	return (
		<div className={styles.product}>
			<div className={`${styles.product__info} ${styles.product__left}`}>
				{!loadingStatus ? (
					<img src={previewImageUrl} alt="product_image" />
				) : (
					<ProductInfoImageSkeleton inline={true} />
				)}
			</div>
			<div className={`${styles.product__info} ${styles.product__center}`}>
				<div className={styles.specs}>
					<div className={styles.specs__row}>
						<p className={styles.specs__top}>
							ID:{" "}
							{!loadingStatus ? (
								publicId
							) : (
								<Skeleton
									style={{ marginLeft: "10px" }}
									width={"10rem"}
									height={"1.2rem"}
									inline={true}
								/>
							)}
						</p>
					</div>
					<div className={styles.specs__row}>
						<h4 className={styles.specs__center}>Характеристики</h4>
					</div>
					<div className={styles.specs__row}>
						<ul className={styles.specs__bottom}>
							{!loadingStatus ? (
								specs
							) : (
								<Skeleton
									style={{ marginBottom: "15px" }}
									count={3}
									width={"100%"}
									height={20}
								/>
							)}
						</ul>
					</div>
				</div>
			</div>
			<div className={`${styles.product__info} ${styles.product__right}`}>
				<ProductDetails product={product} loadingStatus={loadingStatus} />
			</div>
		</div>
	);
};
