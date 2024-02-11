import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../ProductInfo.module.scss";

export const ProductInfoSkeleton = () => {
	return (
		<div className={styles.product}>
			<div className={styles.product__image}>
				<Skeleton className={styles.product__imageSkeleton} inline={true} />
			</div>
			<div className={styles.product__info}>
				<Skeleton
					style={{ marginBottom: "20px" }}
					width={"200px"}
					height={"1.5rem"}
					inline={true}
				/>
				<Skeleton
					style={{ marginBottom: "20px" }}
					width={"100%"}
					height={"1.5rem"}
					inline={true}
				/>
				<Skeleton width={"100%"} height={"1.5rem"} inline={true} />
			</div>
		</div>
	);
};
