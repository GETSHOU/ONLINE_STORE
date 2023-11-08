import { useLayoutEffect } from "react";
import { Outlet, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../store/actions";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES, SESSION_STORAGE_NAMES } from "../../../constants";
import { Header, Footer, ControlMenu } from "../../components";
import { WithContainer } from "../../hoc";
import styles from "./Main.module.scss";

const MainContentWithContainer = WithContainer(Outlet);

export const Main = () => {
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
				setUserAction({
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
						{!isUsersPage ? <MainContentWithContainer /> : <Outlet />}
					</main>
				</div>
				{!isUsersPage && <Footer />}
			</div>
		</div>
	);
};
