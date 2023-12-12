import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES } from "../../../constants";
import { Container } from "../Container/Container";
import styles from "./PrivateContent.module.scss";

export const PrivateContent = ({ children, pageTitle }) => {
	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperInner}>
				<Container isAllowedRoles={isAllowedRoles}>
					<header className={styles.header}>
						<h2 className={styles.headerTitle}>{pageTitle}</h2>
					</header>
					<main className={styles.content}>{children}</main>
				</Container>
			</div>
		</div>
	);
};
