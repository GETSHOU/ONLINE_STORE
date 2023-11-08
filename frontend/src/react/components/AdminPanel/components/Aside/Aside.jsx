import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { BiSolidUser } from "react-icons/bi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { logout } from "../../../../store/actions";
import { SESSION_STORAGE_NAMES } from "../../../../../constants";
import styles from "./Aside.module.scss";

export const Aside = () => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem(SESSION_STORAGE_NAMES.USER_DATA);
	};

	return (
		<aside className={styles.aside}>
			<nav className={styles.nav}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<Link to="/" className={styles.actionElem}>
							<div className={styles.actionElemInner}>
								<div className={styles.actionElemIconWrapper}>
									<BiSolidUser className="icon iconAside" />
								</div>
								<div className={styles.actionElemTextWrapper}>
									<span className={styles.actionElemText}>Профиль</span>
								</div>
							</div>
						</Link>
					</li>
					<li className={styles.item}>
						<Link to="/" className={styles.actionElem}>
							<div className={styles.actionElemInner}>
								<div className={styles.actionElemIconWrapper}>
									<FaUsers className="icon iconAside" />
								</div>
								<div className={styles.actionElemTextWrapper}>
									<span className={styles.actionElemText}>Пользователи</span>
								</div>
							</div>
						</Link>
					</li>
					<li className={styles.item}>
						<button type="button" className={styles.actionElem} onClick={onLogout}>
							<div className={styles.actionElemInner}>
								<div className={styles.actionElemIconWrapper}>
									<RiLogoutBoxFill className="icon iconAside" />
								</div>
								<div className={styles.actionElemTextWrapper}>
									<span className={styles.actionElemText}>Выйти</span>
								</div>
							</div>
						</button>
					</li>
				</ul>
			</nav>
		</aside>
	);
};
