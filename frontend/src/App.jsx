import { useLayoutEffect } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./react/store/actions";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess } from "./utils";
import { ERRORS, ROLES, SESSION_STORAGE_NAMES } from "./constants";
import {
	Cart,
	Users,
	MainPage,
	Categories,
	Subcategories,
	ProductsManagement,
	CategoriesManagement,
	SubcategoriesManagement,
} from "./react/pages";
import { Header, Footer, ControlMenu, Error } from "./react/components";
import { WithContainer } from "./react/hoc";
import styles from "./App.module.scss";

const CartWithContainer = WithContainer(Cart);
const MainPageWithContainer = WithContainer(MainPage);
const CategoriesWithContainer = WithContainer(Categories);
const SubcategoriesWithContainer = WithContainer(Subcategories);

export const App = () => {
	const dispatch = useDispatch();

	const isUsersPage = !!useMatch("/users");
	const isProductsManagementPage = !!useMatch("/products-management");
	const isCategoriesManagementPage = !!useMatch("/categories-management");
	const isSubcategoriesManagementPage = !!useMatch("/subcategories-management");

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
	const isAdminPanel =
		isUsersPage ||
		isCategoriesManagementPage ||
		isSubcategoriesManagementPage ||
		isProductsManagementPage;

	return (
		<div
			className={
				isAdminPanel
					? `${styles.pageWrapper} ${styles.darkPageWrapper}`
					: `${styles.pageWrapper}`
			}
		>
			{isAdmin && <ControlMenu />}
			{/* <ControlMenu /> */}
			<div className={styles.wrapper}>
				<div className={styles.mainContent}>
					{!isAdminPanel && <Header />}
					<main
						className={
							!isAdminPanel
								? `${styles.contentWrapper}`
								: `${styles.contentWrapper} ${styles.adminPanel}`
						}
					>
						<Routes>
							<Route path="/" element={<MainPageWithContainer />} />
							<Route path="/categories" element={<CategoriesWithContainer />} />
							<Route
								path="/categories/:id/subcategories"
								element={<SubcategoriesWithContainer />}
							/>
							<Route path="/cart" element={<CartWithContainer />} />
							<Route path="/users" element={<Users />} />
							<Route path="/categories-management" element={<CategoriesManagement />} />
							<Route
								path="/subcategories-management"
								element={<SubcategoriesManagement />}
							/>
							<Route path="/products-management" element={<ProductsManagement />} />
							<Route path="*" element={<Error error={ERRORS.PAGE_NOT_EXIST} />} />
						</Routes>
					</main>
				</div>
				{!isAdminPanel && <Footer />}
			</div>
		</div>
	);
};
