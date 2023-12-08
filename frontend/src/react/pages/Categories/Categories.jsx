import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategoriesIsLoading } from "../../store/actions";
import { categoriesSelector, categoriesIsLoadingSelector } from "../../store/selectors";
import { request } from "../../../utils";
import { PageTitle, CategoryCard } from "../../components";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const dispatch = useDispatch();

	const isLoading = useSelector(categoriesIsLoadingSelector);
	const categories = useSelector(categoriesSelector);

	// const [isLoading, setIsLoading] = useState(true);
	// const [categories, setCategories] = useState([]);

	useEffect(() => {
		dispatch(setCategoriesIsLoading(true));
		// setIsLoading(true);

		request("/api/categories")
			.then(response => {
				dispatch(setCategories(response.data));
				// setCategories(response.data);
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				dispatch(setCategoriesIsLoading(false));
				// setIsLoading(false);
			});
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title="Каталог товаров" />
			<div className={styles.cards}>
				{isLoading ? null : categories.length > 0 ? (
					<>
						{categories.map(({ id, title }) => (
							<CategoryCard key={id} id={id} categoryTitle={title} />
						))}
					</>
				) : null}
			</div>
		</div>
	);
};
