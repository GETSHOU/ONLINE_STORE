import { useEffect, useState } from "react";
import { PageTitle, CategoryCard } from "../../components";
import { request } from "../../../utils";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		request("/categories").then(({ data }) => setCategories(data));
	}, []);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={"Каталог"} />
			<div className={styles.cards}>
				{/* {categories.map(({ id, title }) => {
					return <CategoryCard key={id} id={id} categoryTitle={title} />;
				})} */}
				<CategoryCard categoryTitle={"Комплектующие для ПК"} />
				<CategoryCard categoryTitle={"Периферия"} />
				<CategoryCard categoryTitle={"Серверное оборудование"} />
			</div>
		</div>
	);
};
