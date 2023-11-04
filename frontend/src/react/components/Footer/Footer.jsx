import { AiOutlineCopyright } from "react-icons/ai";
import { Container } from "../Container/Container";
import styles from "./Footer.module.scss";

export const Footer = () => {
	return (
		<footer className={styles.wrapper}>
			<Container>
				<div className={styles.copyright}>
					<AiOutlineCopyright className="icon iconCopyright" />
					<span className={styles.copyrightText}>2023. Все права защищены.</span>
				</div>
			</Container>
		</footer>
	);
};
