import { Route, Routes, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoleSelector } from "./react/store/selectors";
import { checkAccess } from "./utils";
import { ERRORS, ROLES } from "./constants";
import {
	Users,
	Basket,
	Product,
	Products,
	HomePage,
	Categories,
	Subcategories,
	ProductsManagement,
	CategoriesManagement,
	SubcategoriesManagement,
} from "./react/pages";
import { Error, PrivateNavMenu } from "./react/components";
import styles from "./App.module.scss";

export const App = () => {
	const roleId = useSelector(userRoleSelector);
	const isAllowedRoles = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	const isUsersPage = !!useMatch("/users");
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
				<Route path="/" element={<HomePage />}>
					<Route path="categories" element={<Categories />} />
					<Route path="categories/:id" element={<Subcategories />} />
					<Route path="subcategories/:id" element={<Products />} />
					<Route path="products/:id" element={<Product />} />
					<Route path="basket" element={<Basket />} />
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

// TODO_0: ЧТО НУЖНО ДОРАБОТАТЬ
// TODO_1: Добавить поиск по товарам в админке
// TODO_2: Добавить поиск по товарам в в магазине
// TODO_3: Разобраться, что делать с количеством товаров на карточках категорий
// TODO_4: Разделить роуты на разные файлы в Express.js (https://lk.result.school/pl/teach/control/lesson/view?id=321219502&editMode=0)
// TODO_5: Добавить тени ко всем скелетонам
// TODO_6: Создать обертку для скелетонов для темы скелетона
