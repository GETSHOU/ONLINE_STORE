import Skeleton from "react-loading-skeleton";
import { ProductActionsSkeleton } from "../../../../components";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "../ProductContent/ProductContent.module.scss";

export const ProductContentSkeleton = props => {
	return (
		<div className={styles.product}>
			<div className={`${styles.product__info} ${styles.product__left}`}>
				<Skeleton className={styles.product__imageSkeleton} {...props} />
			</div>
			<div className={`${styles.product__info} ${styles.product__center}`}>
				<div className={styles.specs}>
					<div className={styles.specs__row}>
						<p className={styles.specs__top}>
							<Skeleton width={"10rem"} height={"1.2rem"} {...props} />
						</p>
					</div>
					<div className={styles.specs__row}>
						<Skeleton width={"15rem"} height={"1.2rem"} {...props} />
					</div>
					<div className={styles.specs__row}>
						<ul className={styles.specs__bottom}>
							<Skeleton
								style={{ marginBottom: "20px" }}
								count={3}
								width={"100%"}
								height={20}
								{...props}
							/>
						</ul>
					</div>
				</div>
			</div>
			<div className={`${styles.product__info} ${styles.product__right}`}>
				<ProductActionsSkeleton inline={true} />
			</div>
		</div>
	);
};
