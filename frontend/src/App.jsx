import { useLayoutEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./react/store/actions";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess } from "./utils";
import { ERRORS, ROLES, SESSION_STORAGE_NAMES } from "./constants";
import { MainPage, Catalog, Cart, Users } from "./react/pages";
import { Header, Footer, ControlMenu, Error } from "./react/components";
import { WithContainer } from "./react/hoc";
import styles from "./App.module.scss";

const MainPageWithContainer = WithContainer(MainPage);
const CatalogWithContainer = WithContainer(Catalog);
const CartWithContainer = WithContainer(Cart);

export const App = () => {
	const dispatch = useDispatch();
	const isUsersPage = !!useMatch("/users");
	const roleId = useSelector(userRoleSelector);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem(SESSION_STORAGE_NAMES.USER_DATA);

		if (!currentUserDataJSON) {
			return;
		} else {
			const currentUserData = JSON.parse(currentUserDataJSON);

			dispatch(
				setUser({
					...currentUserData,
					roleId: Number(currentUserData.roleId),
				}),
			);
		}
	}, [dispatch]);

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	return (
		<div
			className={
				isUsersPage
					? `${styles.pageWrapper} ${styles.darkPageWrapper}`
					: `${styles.pageWrapper}`
			}
		>
			{isAdmin && <ControlMenu />}
			<div className={styles.wrapper}>
				<div className={styles.mainContent}>
					{!isUsersPage && <Header />}
					<main
						className={
							!isUsersPage
								? `${styles.contentWrapper}`
								: `${styles.contentWrapper} ${styles.contentWrapperUsersPage}`
						}
					>
						<Routes>
							<Route path="/" element={<MainPageWithContainer />} />
							<Route path="/catalog" element={<CatalogWithContainer />} />
							<Route path="/cart" element={<CartWithContainer />} />
							<Route path="/users" element={<Users />} />
							<Route path="*" element={<Error error={ERRORS.PAGE_NOT_EXIST} />} />
						</Routes>
					</main>
				</div>
				{!isUsersPage && <Footer />}
			</div>
		</div>
	);
};
