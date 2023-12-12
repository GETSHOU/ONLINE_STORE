import { Route, Routes, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess } from "./utils";
import { ERRORS, ROLES } from "./constants";
import {
	Cart,
	Users,
	MainPage,
	Categories,
	Subcategories,
	CategoriesManagement,
	Products,
	Product,
} from "./react/pages";
import { Error } from "./react/components";
import { AdminAsideNavMenu } from "./react/components/AdminContent/components/AdminAsideNavMenu/AdminAsideNavMenu";
import styles from "./App.module.scss";

export const App = () => {
	const roleId = useSelector(userRoleSelector);
	const isAdminOrModerator = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const isUsersPage = useMatch("/users");
	const isCategoriesManagementPage = useMatch("/categories-management");
	const isNotExistPage = useMatch("/users-not-exist");

	const privatePages = isUsersPage || isCategoriesManagementPage || isNotExistPage;

	return (
		<div
			className={
				!privatePages
					? `${styles.pageWrapper}`
					: `${styles.pageWrapper} ${styles.privatePage}`
			}
		>
			{isAdminOrModerator && <AdminAsideNavMenu />}
			<Routes>
				{/*Интернет-магазин*/}
				<Route path="/" element={<MainPage isAdminOrModerator={isAdminOrModerator} />}>
					<Route path="categories" element={<Categories />} />
					<Route path="categories/:id/subcategories" element={<Subcategories />} />
					<Route path="subcategories/:id/products" element={<Products />} />
					<Route path="products/:id" element={<Product />} />
					<Route path="cart" element={<Cart />} />

					{/*Ошибки*/}
					<Route path="categories-not-exist" element={<div>Категорий нет</div>} />
					<Route path="subcategories-not-exist" element={<div>Подкатегорий нет</div>} />
					<Route path="products-not-exist" element={<div>Продуктов нет</div>} />
				</Route>

				{/*Админ-панель*/}
				<Route path="/users" element={<Users />} />
				<Route path="/categories-management" element={<CategoriesManagement />} />

				{/*Ошибки*/}
				<Route path="/users-not-exist" element={<div>Пользователей нет</div>} />

				{/*Общие Ошибки*/}
				<Route path="*" element={<Error error={ERRORS.PAGE_NOT_EXIST} />} />
			</Routes>
		</div>
	);
};
