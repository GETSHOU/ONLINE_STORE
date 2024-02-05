import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductCardSkeleton.module.scss";

export const ProductCardSkeleton = ({ products }, props) => {
	return Array(products)
		.fill(0)
		.map((_, i) => (
			<div key={i} className={styles.skeleton}>
				<div className={styles.skeleton__left}>
					<Skeleton className={styles.skeleton__image} {...props} />
				</div>
				<div className={styles.skeleton__center}>
					<Skeleton
						className={styles.skeleton__info}
						containerClassName={styles.skeleton__containerCenter}
						{...props}
					/>
					<Skeleton
						className={styles.skeleton__info}
						containerClassName={styles.skeleton__containerCenter}
						{...props}
					/>
					<Skeleton
						className={styles.skeleton__info}
						containerClassName={styles.skeleton__containerCenter}
						{...props}
					/>
				</div>
				<div className={styles.skeleton__right}>
					<Skeleton
						className={styles.skeleton__details}
						containerClassName={styles.skeleton__containerRight}
						{...props}
					/>
					<Skeleton
						className={styles.skeleton__details}
						containerClassName={styles.skeleton__containerRight}
						{...props}
					/>
				</div>
			</div>
		));
};
