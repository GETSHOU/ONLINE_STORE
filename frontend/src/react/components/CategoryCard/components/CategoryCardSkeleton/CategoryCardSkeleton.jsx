import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../CategoryCard.module.scss";

export const CategoryCardSkeleton = ({ categories }, props) => {
	return Array(categories)
		.fill(0)
		.map((_, i) => (
			<div key={i} className={`${styles.card} ${styles.skeleton}`}>
				<Skeleton
					width={"100%"}
					height={"100%"}
					containerClassName={`${styles.skeleton__card}`}
					{...props}
				/>
			</div>
		));
};
