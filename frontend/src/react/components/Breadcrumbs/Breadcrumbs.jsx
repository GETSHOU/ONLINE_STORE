import { useEffect, useState } from "react";
import { Crumb } from "./components/Crumb/Crumb";
import styles from "./Breadcrumbs.module.scss";

export const Breadcrumbs = () => {
	const [crumbs, setCrumbs] = useState([]);

	useEffect(() => {}, []);

	return (
		<nav className={styles.nav}>
			<ol className={styles.navList}>
				{crumbs &&
					crumbs.map(({ name, route }, i) => {
						return <Crumb key={i} link={route} name={name} />;
					})}
				{/* {!homeMatch && <Crumb link={"/"} name={"Главная"} />}
				{categoriesMatch && <Crumb link={"/categories"} name={categoriesTitle} />}
				{subcategoriesMatch && (
					<Crumb link={`/categories/${params.id}`} name={subcategoriesTitle} />
				)}
				{productsMatch && (
					<Crumb link={`/subcategories/${params.id}`} name={productsTitle} />
				)}
				{productMatch && <Crumb link={`/products/${params.id}`} name={productTitle} />}
				{basketMatch && <Crumb link={`/basket`} name={"Корзина"} />} */}
			</ol>
		</nav>
	);
};
