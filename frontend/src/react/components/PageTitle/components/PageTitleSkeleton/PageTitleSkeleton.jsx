import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../PageTitle.module.scss";

export const PageTitleSkeleton = props => {
	return (
		<div className={styles.pageTitle}>
			<Skeleton {...props} className={styles.skeleton} />
		</div>
	);
};
