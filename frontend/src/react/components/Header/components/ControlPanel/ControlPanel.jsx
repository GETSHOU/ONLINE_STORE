import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { BiSolidUser } from "react-icons/bi";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { logout, openModal } from "../../../../store/actions";
import {
	userRoleSelector,
	userNameSelector,
	modalTypeSelector,
} from "../../../../store/selectors";
import { checkAccess } from "../../../../../utils";
import { MODAL_TYPES, ROLES, SESSION_STORAGE_NAMES } from "../../../../../constants";
import { WithModal, WithModalAuth } from "../../../../hoc";
import { Authorization } from "../../../Authorization/Authorization";
import { Registration } from "../../../Registration/Registration";
import styles from "./ControlPanel.module.scss";

const ModalWindowAuth = WithModal(WithModalAuth(Authorization));
const ModalWindowReg = WithModal(WithModalAuth(Registration));

export const ControlPanel = () => {
	const roleId = useSelector(userRoleSelector);
	const currentModal = useSelector(modalTypeSelector);
	const currentUserName = useSelector(userNameSelector);
	const [userName, setUserName] = useState(currentUserName);
	const sessionState = !!sessionStorage.getItem(SESSION_STORAGE_NAMES.USER_DATA);

	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		if (sessionState) {
			if (roleId === ROLES.GUEST) {
				setUserName(null);
			}
			setUserName(currentUserName);
		}

		setUserName(currentUserName);
	}, [currentUserName, roleId, setUserName, sessionState, userName]);

	const onLogout = () => {
		dispatch(logout());
	};

	const handleOpenAuthModal = () =>
		dispatch(openModal({ type: MODAL_TYPES.AUTHORIZATION }));
	const handleOpenRegModal = () =>
		dispatch(openModal({ type: MODAL_TYPES.REGISTRATION }));

	return (
		<>
			<div className={styles.wrapper}>
				<div className={`${styles.control} ${styles.disabled}`}>
					<BiSolidUser className="icon iconControl" />
					<span className={styles.controlItem}>{userName}</span>
				</div>
				<Link to="/basket" className={styles.control}>
					<IoMdCart className="icon iconControl" />
					<span className={styles.controlItem}>Корзина</span>
				</Link>
				{!sessionState ? (
					<button className={styles.control} onClick={handleOpenAuthModal}>
						<RiLoginBoxFill className="icon iconControl" />
						<span className={styles.controlItem}>Войти</span>
					</button>
				) : (
					!isAllowedRoles && (
						<button className={styles.control} onClick={onLogout}>
							<RiLogoutBoxFill className="icon iconControl" />
							<span className={styles.controlItem}>Выйти</span>
						</button>
					)
				)}
			</div>

			{/* Рендер модального окна */}
			{currentModal === MODAL_TYPES.AUTHORIZATION ? (
				<ModalWindowAuth
					modalTitle="Авторизация"
					toggleText="Регистрация"
					toggleModal={handleOpenRegModal}
				/>
			) : (
				currentModal === MODAL_TYPES.REGISTRATION && (
					<ModalWindowReg
						modalTitle="Регистрация"
						toggleText="У вас уже есть аккаунт?"
						toggleModal={handleOpenAuthModal}
					/>
				)
			)}
		</>
	);
};
