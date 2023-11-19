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
	Catalog,
	MainPage,
	CatalogManagement,
	ProductsManagement,
	SubcategoryManagement,
} from "./react/pages";
import { Header, Footer, ControlMenu, Error } from "./react/components";
import { WithContainer } from "./react/hoc";
import styles from "./App.module.scss";

const MainPageWithContainer = WithContainer(MainPage);
const CatalogWithContainer = WithContainer(Catalog);
const CartWithContainer = WithContainer(Cart);

export const App = () => {
	const dispatch = useDispatch();
	const isUsersPage = !!useMatch("/users");
	const isCatalogManagementPage = !!useMatch("/catalog-management");
	const isSubcategoryManagementPage = !!useMatch("/subcategory-management");
	const isProductsManagementPage = !!useMatch("/products-management");
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
		isCatalogManagementPage ||
		isSubcategoryManagementPage ||
		isProductsManagementPage;

	return (
		<div
			className={
				isAdminPanel
					? `${styles.pageWrapper} ${styles.darkPageWrapper}`
					: `${styles.pageWrapper}`
			}
		>
			{/* {isAdmin && <ControlMenu />} */}
			<ControlMenu />
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
							<Route
								path="/"
								element={<MainPageWithContainer pageTitle="Главная страница" />}
							/>
							<Route
								path="/catalog"
								element={<CatalogWithContainer pageTitle="Каталог" />}
							/>
							<Route path="/cart" element={<CartWithContainer pageTitle="Корзина" />} />
							<Route path="/users" element={<Users pageTitle="Пользователи" />} />
							<Route
								path="/catalog-management"
								element={<CatalogManagement pageTitle="Управление каталогом" />}
							/>
							<Route
								path="/subcategory-management"
								element={<SubcategoryManagement pageTitle="Управление подкатегориямии" />}
							/>
							<Route
								path="/products-management"
								element={<ProductsManagement pageTitle="Управление товарами" />}
							/>
							<Route path="*" element={<Error error={ERRORS.PAGE_NOT_EXIST} />} />
						</Routes>
					</main>
				</div>
				{!isAdminPanel && <Footer />}
			</div>
		</div>
	);
};
