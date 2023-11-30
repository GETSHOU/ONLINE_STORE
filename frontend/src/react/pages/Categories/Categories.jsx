import { useEffect, useState } from "react";
import { PageTitle, CategoryCard } from "../../components";
import { request } from "../../../utils";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	setIsLoading(true);

	// 	request("/api/categories")
	// 		.then(({ data }) => {
	// 			setCategories(data);
	// 			setIsLoading(false);
	// 		})
	// 		.finally(() => setIsLoading(false));
	// }, []);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={"Каталог товаров"} />
			<div className={styles.cards}>
				{/* {!isLoading ? (
					<>
						{categories.map(({ id, title }) => {
							return <CategoryCard key={id} id={id} categoryTitle={title} />;
						})}
					</>
				) : (
					<div>ЗАГРУЗКА...</div>
				)} */}

				<CategoryCard categoryTitle={"Комплектующие для ПК"} />
				<CategoryCard categoryTitle={"Периферия"} />
				<CategoryCard categoryTitle={"Серверное оборудование"} />
			</div>
		</div>
	);
};
