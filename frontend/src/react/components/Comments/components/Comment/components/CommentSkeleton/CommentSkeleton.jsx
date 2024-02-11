import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../Comment.module.scss";

export const CommentSkeleton = props => {
	return (
		<div className={`${styles.comment}`}>
			<header className={styles.comment__header}>
				<div className={styles.comment__author}>
					<Skeleton width={"300px"} height={"40px"} {...props} />
				</div>
				<div className={styles.actions}>
					<Skeleton
						count={2}
						width={"40px"}
						height={"40px"}
						className={styles.actions__actionSkeleton}
						{...props}
					/>
				</div>
			</header>
			<div className={styles.comment__body}>
				<Skeleton
					count={2}
					width={"100%"}
					height={"20px"}
					className={styles.comment__bodySkeleton}
					{...props}
				/>
			</div>
			<footer className={styles.comment__footer}>
				<Skeleton width={"400px"} height={"40px"} {...props} />
			</footer>
		</div>
	);
};
