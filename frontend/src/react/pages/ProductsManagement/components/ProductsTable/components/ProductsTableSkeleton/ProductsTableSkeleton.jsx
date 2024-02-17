import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../ProductsTable.module.scss";

export const ProductsTableSkeleton = ({ products, baseColor, highlightColor }, props) => {
	return Array(products)
		.fill(0)
		.map((_, i) => (
			<SkeletonTheme key={i} baseColor={baseColor} highlightColor={highlightColor}>
				<div className={styles.table}>
					<Skeleton
						width={"100%"}
						height={"100%"}
						containerClassName={`${styles.table__rowSkeleton}`}
						{...props}
					/>
					<Skeleton
						width={"100%"}
						height={"100%"}
						containerClassName={`${styles.table__rowSkeleton}`}
						{...props}
					/>
					<Skeleton
						width={"100%"}
						height={"100%"}
						containerClassName={`${styles.table__rowSkeleton}`}
						{...props}
					/>
					<Skeleton
						width={"100%"}
						height={"100%"}
						containerClassName={`${styles.table__rowSkeleton}`}
						{...props}
					/>
				</div>
			</SkeletonTheme>
		));
};
