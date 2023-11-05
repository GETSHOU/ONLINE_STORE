import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { openModalForm } from "../../../../store/actions";
import { formModalState } from "../../../../store/selectors";
import { Authorization } from "../../../Authorization/Authorization";
import { Registration } from "../../../Registration/Registration";
import { withModal } from "../../../../hoc";
import styles from "./ControlPanel.module.scss";

const AuthorizationModal = withModal(Authorization);
const RegistrationModal = withModal(Registration);

export const ControlPanel = () => {
	const dispatch = useDispatch();
	const currentModal = useSelector(formModalState);

	const openAuthModal = () => dispatch(openModalForm("authorization"));
	const openRegistrationModal = () => dispatch(openModalForm("registration"));

	return (
		<>
			<div className={styles.wrapper}>
				<button className={styles.control} onClick={openAuthModal}>
					<BiSolidUser className="icon iconControl" />
					<span className={styles.controlName}>Кабинет</span>
				</button>
				<Link to="/" className={styles.control}>
					<IoMdCart className="icon iconControl" />
					<span className={styles.controlName}>Корзина</span>
				</Link>
			</div>
			{currentModal === "authorization" ? (
				<AuthorizationModal
					modalTitle="Авторизация"
					buttonText="Регистрация"
					toggleModal={openRegistrationModal}
				/>
			) : (
				<RegistrationModal
					modalTitle="Регистрация"
					buttonText="У вас уже есть аккаунт?"
					toggleModal={openAuthModal}
				/>
			)}
		</>
	);
};
