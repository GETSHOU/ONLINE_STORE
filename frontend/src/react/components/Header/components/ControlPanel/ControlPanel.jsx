import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { logout, openModalForm } from "../../../../store/actions";
import { userRoleSelector } from "../../../../store/selectors";
import { checkAccess } from "../../../../../utils";
import { ROLES } from "../../../../../constants";
import { ConditionalRenderingModal } from "../../../Modal/components/ConditionalRenderingModal/ConditionalRenderingModal";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
	const roleId = useSelector(userRoleSelector);
	const dispatch = useDispatch();
	const userIsLoggedIn = useSelector(({ user }) => user.isLoggedIn);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const openAuthModal = () => dispatch(openModalForm("authorization"));

	const onLogout = () => {
		dispatch(logout());
	};

	// TODO: сделать компонент, который отображает имя текущего пользователя

	return (
		<>
			<div className={styles.wrapper}>
				{!userIsLoggedIn ? (
					<button className={styles.control} onClick={openAuthModal}>
						<RiLoginBoxFill className="icon iconControl" />
						<span className={styles.controlName}>Войти</span>
					</button>
				) : (
					<>
						{!isAllowedRoles && (
							<>
								<button className={styles.control} onClick={onLogout}>
									<RiLogoutBoxFill className="icon iconControl" />
									<span className={styles.controlName}>Выйти</span>
								</button>
							</>
						)}
					</>
				)}
				<Link to="/basket" className={styles.control}>
					<IoMdCart className="icon iconControl" />
					<span className={styles.controlName}>Корзина</span>
				</Link>
			</div>
			<ConditionalRenderingModal />
		</>
	);
};
