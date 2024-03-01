import { useLayoutEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaBagShopping, FaCartShopping } from "react-icons/fa6";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { openModal, logoutAsync } from "../../../../store/actions";
import {
	basketSelector,
	userIdSelector,
	userRoleSelector,
	userNameSelector,
	modalTypeSelector,
} from "../../../../store/selectors";
import { checkAccess, getTotalCountProducts } from "../../../../../utils";
import { MODAL_TYPES, ROLES } from "../../../../../constants";
import { WithModal, WithModalAuth } from "../../../../hoc";
import { Authorization } from "../../../Authorization/Authorization";
import { Registration } from "../../../Registration/Registration";
import styles from "./ControlPanel.module.scss";

const ModalWindowAuth = WithModal(WithModalAuth(Authorization));
const ModalWindowReg = WithModal(WithModalAuth(Registration));

export const ControlPanel = () => {
	const basket = useSelector(basketSelector);
	const userId = useSelector(userIdSelector);
	const roleId = useSelector(userRoleSelector);
	const currentModal = useSelector(modalTypeSelector);
	const currentUserName = useSelector(userNameSelector);

	const [userName, setUserName] = useState(currentUserName);

	const sessionState = !!sessionStorage.getItem("userData");

	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isOrdersPage = !!useMatch(`/orders/${userId}`);

	const currentBasketDataJSON = localStorage.getItem("basket");
	const basketFromStorage = JSON.parse(currentBasketDataJSON);

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
		dispatch(logoutAsync(basketFromStorage));

		if (isOrdersPage) {
			navigate(-1);
		}
	};

	const handleOpenAuthModal = () =>
		dispatch(openModal({ type: MODAL_TYPES.AUTHORIZATION }));
	const handleOpenRegModal = () =>
		dispatch(openModal({ type: MODAL_TYPES.REGISTRATION }));

	return (
		<>
			<div className={styles.wrapper}>
				<div className={`${styles.control} ${styles.disabled}`}>
					<FaUser className="icon iconControl" />
					<span className={styles.controlItem}>{userName}</span>
				</div>
				{sessionState && (
					<Link to={`/orders/${userId}`} className={styles.control}>
						<FaBagShopping className="icon iconControl" />
						<span className={styles.controlItem}>Мои заказы</span>
					</Link>
				)}
				<Link to="/basket" className={styles.control}>
					<FaCartShopping className="icon iconControl" />
					<span className={styles.controlItem}>Корзина</span>
					{getTotalCountProducts(basket) !== 0 && (
						<span className={styles.controlCountProducts}>
							{getTotalCountProducts(basket) > 99 ? "99+" : getTotalCountProducts(basket)}
						</span>
					)}
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
					toggleText="Зарегистрироваться"
					toggleModal={handleOpenRegModal}
				/>
			) : (
				currentModal === MODAL_TYPES.REGISTRATION && (
					<ModalWindowReg
						modalTitle="Регистрация"
						toggleText="Войти"
						toggleModal={handleOpenAuthModal}
					/>
				)
			)}
		</>
	);
};
