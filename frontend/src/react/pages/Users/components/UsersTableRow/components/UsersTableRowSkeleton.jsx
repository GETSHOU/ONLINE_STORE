import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../UsersTableRow.module.scss";

export const UsersTableRowSkeleton = ({ rows, baseColor, highlightColor }, props) => {
	return Array(rows)
		.fill(0)
		.map((_, i) => (
			<SkeletonTheme key={i} baseColor={baseColor} highlightColor={highlightColor}>
				<div key={i} className={styles.row}>
					<div className={`${styles.row__cell} ${styles.skeleton}`}>
						<Skeleton
							width={"100%"}
							height={"100%"}
							containerClassName={styles.skeleton__container}
							{...props}
						/>
					</div>
					<div className={`${styles.row__cell} ${styles.skeleton}`}>
						<Skeleton
							width={"100%"}
							height={"100%"}
							containerClassName={styles.skeleton__container}
							{...props}
						/>
					</div>
					<div className={`${styles.row__cell} ${styles.skeleton}`}>
						<Skeleton
							width={"100%"}
							height={"100%"}
							containerClassName={styles.skeleton__container}
							{...props}
						/>
					</div>
					<div className={`${styles.row__cell} ${styles.skeleton}`}>
						<Skeleton
							width={"100%"}
							height={"100%"}
							containerClassName={styles.skeleton__container}
							{...props}
						/>
					</div>
					<div className={`${styles.row__cell} ${styles.skeleton}`}>
						<Skeleton
							count={2}
							width={"100%"}
							height={"100%"}
							containerClassName={styles.skeleton__actionContainer}
							{...props}
						/>
					</div>
				</div>
			</SkeletonTheme>
		));
};
