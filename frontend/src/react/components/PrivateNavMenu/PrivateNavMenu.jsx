import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { TbLayoutGrid } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { logoutAsync } from "../../store/actions";
import { userIdSelector } from "../../store/selectors";
import { PrivateNavMenuItem } from "./components/PrivateNavMenuItem/PrivateNavMenuItem";
import styles from "./PrivateNavMenu.module.scss";

export const PrivateNavMenu = () => {
	const userId = useSelector(userIdSelector);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isOrdersPage = !!useMatch(`/orders/${userId}`);

	const currentBasketDataJSON = localStorage.getItem("basket");
	const basketFromStorage = JSON.parse(currentBasketDataJSON);

	const onLogout = () => {
		dispatch(logoutAsync(basketFromStorage));

		if (isOrdersPage) {
			navigate(-1);
		}
	};

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
