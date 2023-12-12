import { AiOutlineCopyright } from "react-icons/ai";
import styles from "./FooterContent.module.scss";

export const FooterContent = () => {
	return (
		<div className={styles.copyright}>
			<AiOutlineCopyright className="icon iconCopyright" />
			<span className={styles.copyrightText}>2023. Все права защищены.</span>
		</div>
	);
};
