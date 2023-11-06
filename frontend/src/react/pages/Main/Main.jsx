import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";
import { WithContainer } from "../../hoc";
import styles from "./Main.module.scss";

import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { setUserAction } from "../../store/actions";
import { checkAccess } from "../../../utils";
import { ROLES } from "../../../constants";

const MainContentWithContainer = WithContainer(Outlet);

export const Main = () => {
	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

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
