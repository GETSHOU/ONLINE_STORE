import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CommentSkeleton.module.scss";

export const CommentSkeleton = props => {
	return (
		<div className={`${styles.comment} ${styles.skeleton}`}>
			<header className={styles.comment__header}>
				<div className={styles.comment__headerLeft}>
					<Skeleton className={styles.skeleton__headerLeft} {...props} />
				</div>
				<div className={styles.comment__headerRight}>
					<Skeleton
						className={styles.skeleton__headerRight}
						style={{ marginRight: "10px" }}
						{...props}
					/>
					<Skeleton className={styles.skeleton__headerRight} {...props} />
				</div>
			</header>
			<div className={styles.comment__content}>
				<Skeleton className={styles.skeleton__content} {...props} />
			</div>
			<footer className={styles.comment__footer}>
				<Skeleton className={styles.skeleton__footer} {...props} />
			</footer>
		</div>
	);
};
