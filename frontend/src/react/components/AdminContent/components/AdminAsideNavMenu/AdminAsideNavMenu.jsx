import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { BiSolidUser } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { logout } from "../../../../store/actions";
import { AsideNavItem } from "./components/AsideNavItem/AsideNavItem";
import styles from "./AdminAsideNavMenu.module.scss";

export const AdminAsideNavMenu = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<div className={styles.wrapper}>
			<aside className={styles.aside}>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<AsideNavItem
							link="/"
							text="На главную сайта"
							icon={<CgWebsite className="icon iconControlMenu" />}
						/>
						<AsideNavItem
							link="/profile"
							text="Профиль"
							icon={<BiSolidUser className="icon iconControlMenu" />}
						/>
						<AsideNavItem
							link="/users"
							text="Пользователи"
							icon={<FaUsers className="icon iconControlMenu" />}
						/>
						<AsideNavItem
							link="/categories-management"
							text="Управление каталогом"
							icon={<TbLayoutGrid className="icon iconControlMenu" />}
						/>
						<AsideNavItem
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
