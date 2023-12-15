import { useSelector } from "react-redux";
import { modalIsOpenSelector } from "../../store/selectors";
import styles from "./Overlay.module.scss";

export const Overlay = ({ children }) => {
	const isOpen = useSelector(modalIsOpenSelector);

	return (
		<div className={!isOpen ? styles.overlay : `${styles.overlay} ${styles.active}`}>
			{children}
		</div>
	);
};
