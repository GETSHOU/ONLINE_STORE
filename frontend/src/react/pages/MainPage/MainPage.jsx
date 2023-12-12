import { Outlet } from "react-router-dom";
import { WithContainer } from "../../hoc";
import { Footer, Header } from "../../components";
import styles from "./MainPage.module.scss";

const Breadcrumbs = () => {
	return <div style={{ margin: "20px 0" }}>BREADCRUMBS</div>;
};

const BreadcrumbsWithContainer = WithContainer(Breadcrumbs);
const MainContentWithContainer = WithContainer(Outlet);

export const MainPage = ({ isAdminOrModerator }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperInner}>
				<Header isAdminOrModerator={isAdminOrModerator} />
				<main className={styles.wrapperMain}>
					<BreadcrumbsWithContainer isAdminOrModerator={isAdminOrModerator} />
					<MainContentWithContainer isAdminOrModerator={isAdminOrModerator} />
				</main>
			</div>
			<Footer isAdminOrModerator={isAdminOrModerator} />
		</div>
	);
};
