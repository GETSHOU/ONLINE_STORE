import { PageTitleSkeleton } from "./components/PageTitleSkeleton/PageTitleSkeleton";
import styles from "./PageTitle.module.scss";

export const PageTitle = ({ title, serverError, loadingStatus }) => {
	return (
		<>
			{!loadingStatus ? (
				!serverError && (
					<div className={styles.pageTitle}>
						<h1 className={styles.pageTitle__title}>{title}</h1>
					</div>
				)
			) : (
				<PageTitleSkeleton inline={true} height={"1.6rem"} width={"500px"} />
			)}
		</>
	);
};
