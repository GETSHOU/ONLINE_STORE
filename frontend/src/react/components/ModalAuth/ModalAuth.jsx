import { useSelector } from "react-redux";
import { modalTypeSelector } from "../../store/selectors";
import { MODAL_TYPES } from "../../../constants";
import styles from "./ModalAuth.module.scss";

export const ModalAuth = ({ children, toggleText, toggleModal }) => {
	const currentModal = useSelector(modalTypeSelector);

	return (
		<div className={styles.modalAuth}>
			<div className={styles.modalAuthBody}>{children}</div>
			<div className={styles.modalAuthActions}>
				{currentModal === MODAL_TYPES.AUTHORIZATION
					? "У Вас нет аккаунта?"
					: currentModal === MODAL_TYPES.REGISTRATION && "У Вас уже есть аккаунт?"}
				<button className={styles.modalAuthToggle} type="button" onClick={toggleModal}>
					{toggleText}
				</button>
			</div>
		</div>
	);
};
