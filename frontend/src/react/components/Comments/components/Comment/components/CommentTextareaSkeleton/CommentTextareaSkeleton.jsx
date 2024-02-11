import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../../CommentTextarea/CommentTextarea.module.scss";

export const CommentTextareaSkeleton = props => {
	return (
		<div className={styles.textarea}>
			<Skeleton
				width={"100%"}
				height={"100px"}
				containerClassName={styles.textarea__fieldSkeleton}
				{...props}
			/>
			<Skeleton
				width={"44px"}
				height={"100%"}
				containerClassName={styles.textarea__buttonSkeleton}
				{...props}
			/>
		</div>
	);
};
