import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PageTitleSkeleton.module.scss";

export const PageTitleSkeleton = props => {
	return <Skeleton className={styles.pageTitleSkeleton} {...props} />;
};
