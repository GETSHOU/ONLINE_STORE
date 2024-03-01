import { useMemo, useState } from "react";
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess, debounce } from "./utils";
import { ROLES, ERRORS } from "./constants";
import {
	Users,
	Basket,
	Orders,
	Product,
	HomePage,
	Categories,
	Subcategories,
	ProductsBySearch,
	ProductsManagement,
	ProductsSubcategory,
	CategoriesManagement,
	SubcategoriesManagement,
} from "./react/pages";
import { Error, PrivateNavMenu } from "./react/components";
import styles from "./App.module.scss";

export const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchCompleted, setSearchCompleted] = useState(false);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1500), []);

	const location = useLocation();

	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const isUsersPage = !!useMatch("/users");
	const isSearchPage = !!useMatch("/products");
	const isNotExistPage = !!useMatch("/users-not-exist");
	const isProductsManagementPage = !!useMatch("/subcategories-m/:id/products-m");
	const isCategoriesManagementPage = !!useMatch("/categories-m");
	const isSubcategoriesManagementPage = !!useMatch("/categories-m/:id/subcategories-m");

	const privatePages =
		isUsersPage ||
		isNotExistPage ||
		isProductsManagementPage ||
		isCategoriesManagementPage ||
		isSubcategoriesManagementPage;

	if (isSearchPage) {
		if (!location.search) {
			return (
				<div className={styles.pageWrapper}>
					<Error error={ERRORS.PAGE_NOT_EXIST} />;
				</div>
			);
		}
	}

	return (
		<div
			className={
				!privatePages
					? `${styles.pageWrapper}`
					: `${styles.pageWrapper} ${styles.privatePage}`
			}
		>
			{isAllowedRoles && <PrivateNavMenu />}
			<Routes>
				{/*Интернет-магазин*/}
				<Route
					path="/"
					element={
						<HomePage
							searchQuery={searchQuery}
							shouldSearch={shouldSearch}
							setSearchQuery={setSearchQuery}
							setShouldSearch={setShouldSearch}
							startDelayedSearch={startDelayedSearch}
							setSearchCompleted={setSearchCompleted}
						/>
					}
				>
					<Route path="categories" element={<Categories />} />
					<Route path="categories/:id" element={<Subcategories />} />
					<Route path="subcategories/:id" element={<ProductsSubcategory />} />
					<Route path="products/:id" element={<Product />} />
					<Route path="basket" element={<Basket />} />
					<Route path="orders/:id" element={<Orders />} />
					<Route
						path="products"
						element={
							<ProductsBySearch
								searchQuery={searchQuery}
								shouldSearch={shouldSearch}
								searchCompleted={searchCompleted}
								setSearchCompleted={setSearchCompleted}
							/>
						}
					/>
				</Route>

				{/*Админ-панель*/}
				<Route path="/users" element={<Users />} />
				<Route path="/categories-m" element={<CategoriesManagement />} />
				<Route
					path="/categories-m/:id/subcategories-m"
					element={<SubcategoriesManagement />}
				/>
				<Route path="/subcategories-m/:id/products-m" element={<ProductsManagement />} />

				{/*Общие Ошибки*/}
				<Route path="*" element={<Error error={ERRORS.PAGE_NOT_EXIST} />} />
			</Routes>
		</div>
	);
};
