import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../ProductActions.module.scss";

export const ProductActionsSkeleton = props => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.price}>
				<Skeleton
					height={"1.5rem"}
					className={styles.skeleton}
					containerClassName={styles.price__priceSkeleton}
					{...props}
				/>
			</div>
			<div className={styles.actions}>
				<Skeleton
					height={"50px"}
					className={styles.skeleton}
					containerClassName={styles.actions__actionSkeleton}
					{...props}
				/>
			</div>
		</div>
	);
};
