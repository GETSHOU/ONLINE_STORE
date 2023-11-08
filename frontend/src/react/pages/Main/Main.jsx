import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../store/actions";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES, SESSION_STORAGE_NAMES } from "../../../constants";
import { Header, Footer, AdminPanel } from "../../components";
import { WithContainer } from "../../hoc";
import styles from "./Main.module.scss";

const MainContentWithContainer = WithContainer(Outlet);

export const Main = () => {
	const dispatch = useDispatch();
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
		<div className={styles.pageWrapper}>
			{isAdmin && <AdminPanel />}
			<div className={styles.mainContentWrapper}>
				<div className={styles.mainContent}>
					<Header />
					<main className={styles.contentWrapper}>
						<MainContentWithContainer />
					</main>
				</div>
				<Footer />
			</div>
		</div>
	);
};
