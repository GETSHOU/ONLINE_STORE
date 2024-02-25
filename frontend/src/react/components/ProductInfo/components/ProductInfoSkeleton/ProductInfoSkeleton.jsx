import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../ProductInfo.module.scss";

export const ProductInfoSkeleton = props => {
	return (
		<div className={styles.product}>
			<div className={styles.product__image}>
				<Skeleton
					className={styles.skeleton}
					containerClassName={styles.product__imageSkeleton}
					height={"100%"}
					{...props}
				/>
			</div>
			<div className={styles.product__info}>
				<Skeleton
					className={styles.skeleton}
					style={{ marginBottom: "20px" }}
					width={"200px"}
					height={"1.5rem"}
					{...props}
				/>
				<Skeleton
					className={styles.skeleton}
					style={{ marginBottom: "20px" }}
					width={"100%"}
					height={"1.5rem"}
					{...props}
				/>
				<Skeleton
					className={styles.skeleton}
					width={"100%"}
					height={"1.5rem"}
					{...props}
				/>
			</div>
		</div>
	);
};
