import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { logout, openModalForm } from "../../../../store/actions";
import { userRoleSelector, userNameSelector } from "../../../../store/selectors";
import { checkAccess } from "../../../../../utils";
import { ROLES, SESSION_STORAGE_NAMES } from "../../../../../constants";
import { ConditionalRenderingModal } from "../../../Modal/components/ConditionalRenderingModal/ConditionalRenderingModal";
import styles from "./ControlPanel.module.scss";
import { useLayoutEffect, useState } from "react";

export const ControlPanel = () => {
	const roleId = useSelector(userRoleSelector);
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

	const openAuthModal = () => dispatch(openModalForm("authorization"));

	const onLogout = () => {
		dispatch(logout());
	};

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
					<button className={styles.control} onClick={openAuthModal}>
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
			<ConditionalRenderingModal />
		</>
	);
};
