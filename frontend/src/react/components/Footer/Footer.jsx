import { WithContainer } from "../../hoc";
import { FooterContent } from "./components/FooterContent/FooterContent";
import styles from "./Footer.module.scss";

const FooterWithContainer = WithContainer(FooterContent);

export const Footer = ({ isAdminOrModerator }) => {
	return (
		<footer className={styles.wrapper}>
			<FooterWithContainer isAdminOrModerator={isAdminOrModerator} />
		</footer>
	);
};
