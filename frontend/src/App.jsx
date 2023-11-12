import { useLayoutEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./react/store/actions";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess } from "./utils";
import { ROLES, SESSION_STORAGE_NAMES } from "./constants";
import { Header, Footer, ControlMenu } from "./react/components";
import { WithContainer } from "./react/hoc";
import styles from "./App.module.scss";
import { Catalog, MainPage, Users } from "./react/pages";

const MainPageWithContainer = WithContainer(MainPage);
const CatalogWithContainer = WithContainer(Catalog);

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
			<div className={styles.mainContentWrapper}>
				<div className={styles.mainContent}>
					{!isUsersPage && <Header />}
					<main className={styles.contentWrapper}>
						<Routes>
							<Route path="/" element={<MainPageWithContainer />} />
							<Route path="/catalog" element={<CatalogWithContainer />} />
							<Route path="/users" element={<Users />} />
							<Route path="*" element={<div>СТРАНИЦА НЕ НАЙДЕНА!</div>} />
						</Routes>
					</main>
				</div>
				{!isUsersPage && <Footer />}
			</div>
		</div>
	);
};
