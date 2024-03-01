import { useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { TbLayoutGrid } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { logoutAsync } from "../../store/actions";
import { PrivateNavMenuItem } from "./components/PrivateNavMenuItem/PrivateNavMenuItem";
import styles from "./PrivateNavMenu.module.scss";

export const PrivateNavMenu = () => {
	const dispatch = useDispatch();

	const currentBasketDataJSON = localStorage.getItem("basket");
	const basketFromStorage = JSON.parse(currentBasketDataJSON);

	const onLogout = () => dispatch(logoutAsync(basketFromStorage));

	return (
		<div className={styles.wrapper}>
			<aside className={styles.aside}>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<PrivateNavMenuItem
							link="/"
							text="На главную сайта"
							icon={<CgWebsite className="icon iconControlMenu" />}
						/>
						<PrivateNavMenuItem
							link="/users"
							text="Пользователи"
							icon={<FaUsers className="icon iconControlMenu" />}
						/>
						<PrivateNavMenuItem
							link="/categories-m"
							text="Управление каталогом"
							icon={<TbLayoutGrid className="icon iconControlMenu" />}
						/>
						<PrivateNavMenuItem
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
