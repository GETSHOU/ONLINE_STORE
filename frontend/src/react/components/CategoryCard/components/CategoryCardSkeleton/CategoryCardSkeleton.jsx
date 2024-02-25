import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../CategoryCard.module.scss";

export const CategoryCardSkeleton = (
	{ baseColor, categories, highlightColor },
	props,
) => {
	return Array(categories)
		.fill(0)
		.map((_, i) => (
			<SkeletonTheme key={i} baseColor={baseColor} highlightColor={highlightColor}>
				<div className={`${styles.card} ${styles.skeleton}`}>
					<Skeleton
						width={"100%"}
						height={"100%"}
						containerClassName={`${styles.skeleton__cardContainer}`}
						{...props}
					/>
				</div>
			</SkeletonTheme>
		));
};
