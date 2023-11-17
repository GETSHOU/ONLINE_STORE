import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { logout } from "../../store/actions";
import { SESSION_STORAGE_NAMES } from "../../../constants";
import { ControlMenuListItem } from "./components/ControlMenuListItem/ControlMenuListItem";
import styles from "./ControlMenu.module.scss";

export const ControlMenu = () => {
	const dispatch = useDispatch();

	const onLogout = () => {
		sessionStorage.removeItem(SESSION_STORAGE_NAMES.USER_DATA);
		dispatch(logout());
		Navigate("/");
	};

	return (
		<div className={styles.wrapper}>
			<aside className={styles.aside}>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<ControlMenuListItem
							link="/"
							text="Главная"
							icon={<AiFillHome className="icon iconControlMenu" />}
						/>
						<ControlMenuListItem
							link="/"
							text="Профиль"
							icon={<BiSolidUser className="icon iconControlMenu" />}
						/>
						<ControlMenuListItem
							link="/users"
							text="Пользователи"
							icon={<FaUsers className="icon iconControlMenu" />}
						/>
						<ControlMenuListItem
							link="/product-catalog-management"
							text="Управление каталогом"
							icon={<FaUsers className="icon iconControlMenu" />}
						/>
						<ControlMenuListItem
							text="Выйти"
							icon={<RiLogoutBoxFill className="icon iconControlMenu" />}
							onLogout={onLogout}
						/>
					</ul>
				</nav>
			</aside>
		</div>
	);
};
