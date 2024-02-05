import { PageTitleSkeleton } from "../Skeleton/PageTitleSkeleton/PageTitleSkeleton";
import styles from "./PageTitle.module.scss";

export const PageTitle = ({ title, loadingStatus }) => {
	return (
		<div className={styles.wrapper}>
			{!loadingStatus ? (
				<h1 className={styles.title}>{title}</h1>
			) : (
				<PageTitleSkeleton inline={true} height={"1.6rem"} />
			)}
		</div>
	);
};
