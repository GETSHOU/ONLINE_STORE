import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductInfoImageSkeleton.module.scss";

export const ProductInfoImageSkeleton = props => {
	return <Skeleton className={styles.productInfoImageSkeleton} {...props} />;
};
