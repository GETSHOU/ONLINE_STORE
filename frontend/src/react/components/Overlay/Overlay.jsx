import { useSelector } from "react-redux";
import { modalIsOpenSelector } from "../../store/selectors";
import styles from "./Overlay.module.scss";

export const Overlay = ({ children }) => {
	const modalIsOpen = useSelector(modalIsOpenSelector);

	return (
		<div className={!modalIsOpen ? styles.overlay : `${styles.overlay} ${styles.active}`}>
			{children}
		</div>
	);
};
