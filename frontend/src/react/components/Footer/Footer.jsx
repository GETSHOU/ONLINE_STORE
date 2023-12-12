import { WithContainer } from "../../hoc";
import { FooterContent } from "./components/FooterContent/FooterContent";
import styles from "./Footer.module.scss";

const FooterWithContainer = WithContainer(FooterContent);

export const Footer = ({ isAllowedRoles }) => {
	return (
		<footer className={styles.wrapper}>
			<FooterWithContainer isAllowedRoles={isAllowedRoles} />
		</footer>
	);
};
