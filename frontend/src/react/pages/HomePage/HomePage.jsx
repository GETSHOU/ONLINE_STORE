import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES } from "../../../constants";
import { WithContainer } from "../../hoc";
import { Footer, Header, Breadcrumbs } from "../../components";
import styles from "./HomePage.module.scss";

const MainContentWithContainer = WithContainer(Outlet);
const BreadcrumbsWithContainer = WithContainer(Breadcrumbs);

export const HomePage = ({
	searchQuery,
	shouldSearch,
	setSearchQuery,
	setShouldSearch,
	startDelayedSearch,
	setSearchCompleted,
}) => {
	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperInner}>
				<Header
					isAllowedRoles={isAllowedRoles}
					searchQuery={searchQuery}
					shouldSearch={shouldSearch}
					setSearchQuery={setSearchQuery}
					setShouldSearch={setShouldSearch}
					startDelayedSearch={startDelayedSearch}
					setSearchCompleted={setSearchCompleted}
				/>
				<main className={styles.wrapperMain}>
					{/* <BreadcrumbsWithContainer isAllowedRoles={isAllowedRoles} /> */}
					<MainContentWithContainer isAllowedRoles={isAllowedRoles} />
				</main>
			</div>
			<Footer isAllowedRoles={isAllowedRoles} />
		</div>
	);
};
