import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess } from "../../../utils";
import { ROLES } from "../../../constants";
import { Container } from "../Container/Container";
import styles from "./PrivateContent.module.scss";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PrivateContent = ({
	children,
	subTitle,
	pageTitle,
	serverError,
	loadingStatus,
}) => {
	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__inner}>
				<Container isAllowedRoles={isAllowedRoles}>
					<header className={styles.header}>
						<div className={styles.header__top}>
							<h1 className={styles.header__pageTitle}>{pageTitle}</h1>
						</div>
						{!loadingStatus ? (
							!serverError && (
								<div className={styles.header__bottom}>
									<h2 className={styles.header__subTitle}>{subTitle}</h2>
								</div>
							)
						) : (
							<SkeletonTheme baseColor={"#B8B8B8"} highlightColor={"#CDCDCD"}>
								<Skeleton
									width={"500px"}
									height={"1.6rem"}
									inline={true}
									containerClassName={styles.header__subTitleSkeleton}
								/>
							</SkeletonTheme>
						)}
					</header>
					<main className={styles.content}>{children}</main>
				</Container>
			</div>
		</div>
	);
};
