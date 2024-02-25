import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../CommentTextarea/CommentTextarea.module.scss";

export const CommentTextareaSkeleton = props => {
	return (
		<div className={`${styles.textarea} ${styles.skeleton}`}>
			<Skeleton
				width={"100%"}
				height={"100px"}
				className={styles.skeleton__field}
				containerClassName={styles.skeleton__fieldContainer}
				{...props}
			/>
			<Skeleton
				width={"44px"}
				height={"100%"}
				className={styles.skeleton__button}
				containerClassName={styles.skeleton__buttonContainer}
				{...props}
			/>
		</div>
	);
};
