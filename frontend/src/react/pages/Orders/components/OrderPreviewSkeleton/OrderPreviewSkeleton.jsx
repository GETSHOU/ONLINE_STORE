import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../Order/Order.module.scss";

export const OrderPreviewSkeleton = ({ orders }, props) => {
	return Array(orders)
		.fill(0)
		.map((_, i) => (
			<li key={i} className={`${styles.order} ${styles.skeleton}`}>
				<Skeleton
					width={"100%"}
					height={"100%"}
					containerClassName={styles.skeleton__container}
					{...props}
				/>
			</li>
		));
};
