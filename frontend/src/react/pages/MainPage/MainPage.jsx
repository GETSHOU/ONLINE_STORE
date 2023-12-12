import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES } from "../../../constants";
import { WithContainer } from "../../hoc";
import { Footer, Header } from "../../components";
import styles from "./MainPage.module.scss";

const Breadcrumbs = () => {
	return <div style={{ margin: "20px 0" }}>BREADCRUMBS</div>;
};

const BreadcrumbsWithContainer = WithContainer(Breadcrumbs);
const MainContentWithContainer = WithContainer(Outlet);

export const MainPage = () => {
	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperInner}>
				<Header isAllowedRoles={isAllowedRoles} />
				<main className={styles.wrapperMain}>
					<BreadcrumbsWithContainer isAllowedRoles={isAllowedRoles} />
					<MainContentWithContainer isAllowedRoles={isAllowedRoles} />
				</main>
			</div>
			<Footer isAllowedRoles={isAllowedRoles} />
		</div>
	);
};
