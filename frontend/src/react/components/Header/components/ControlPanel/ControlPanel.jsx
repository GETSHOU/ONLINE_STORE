import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { logout, openModalForm } from "../../../../store/actions";
import { userRoleSelector } from "../../../../store/selectors";
import { checkAccess } from "../../../../../utils";
import { ROLES, SESSION_STORAGE_NAMES } from "../../../../../constants";
import { ConditionalRenderingModal } from "../../../Modal/components/ConditionalRenderingModal/ConditionalRenderingModal";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);

	const isGuest = checkAccess([ROLES.GUEST], roleId);
	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	const openAuthModal = () => dispatch(openModalForm("authorization"));

	const onLogout = () => {
		sessionStorage.removeItem(SESSION_STORAGE_NAMES.USER_DATA);
		dispatch(logout());
		Navigate("/");
	};

	const toProfile = () => {
		console.log("Переход на страницу профиля");
	};

	return (
		<>
			<div className={styles.wrapper}>
				{isGuest ? (
					<button className={styles.control} onClick={openAuthModal}>
						<RiLoginBoxFill className="icon iconControl" />
						<span className={styles.controlName}>Войти</span>
					</button>
				) : (
					<>
						{!isAdmin && (
							<>
								<Link to="/" className={styles.control} onClick={toProfile}>
									<BiSolidUser className="icon iconControl" />
									<span className={styles.controlName}>Профиль</span>
								</Link>
								<button className={styles.control} onClick={onLogout}>
									<RiLogoutBoxFill className="icon iconControl" />
									<span className={styles.controlName}>Выйти</span>
								</button>
							</>
						)}
					</>
				)}
				<Link to="/" className={styles.control}>
					<IoMdCart className="icon iconControl" />
					<span className={styles.controlName}>Корзина</span>
				</Link>
			</div>
			<ConditionalRenderingModal />
		</>
	);
};
