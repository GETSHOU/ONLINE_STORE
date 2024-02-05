import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CategoryCardSkeleton.module.scss";

export const CategoryCardSkeleton = ({ categories }, props) => {
	return Array(categories)
		.fill(0)
		.map((_, i) => (
			<Skeleton key={i} className={styles.categoryCardSkeleton} {...props} />
		));
};
