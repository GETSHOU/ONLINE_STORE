import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";
import { WithContainer } from "../../hoc";
import styles from "./Main.module.scss";

const MainContentWithContainer = WithContainer(Outlet);

export const Main = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.mainContentWrapper}>
				<div className={styles.mainContent}>
					<Header />
					<main className={styles.contentWrapper}>
						<MainContentWithContainer />
					</main>
				</div>
				<Footer />
			</div>
		</div>
	);
};
