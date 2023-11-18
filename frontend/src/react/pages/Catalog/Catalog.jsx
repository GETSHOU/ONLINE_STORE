import { PageTitle } from "../../components";
import { CategoryCards } from "./components/CategoryCards/CategoryCards";
import styles from "./Catalog.module.scss";

export const Catalog = ({ pageTitle }) => {
	return (
		<div className={styles.wrapper}>
			<PageTitle title={pageTitle} />
			<CategoryCards />
		</div>
	);
};
