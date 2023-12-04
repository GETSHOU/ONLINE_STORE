import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSubcategories, setSubcategoriesIsLoading } from "../../store/actions";
import {
	subcategoriesSelector,
	subcategoriesIsLoadingSelector,
} from "../../store/selectors";
import { request } from "../../../utils";
import { CategoryCard, PageTitle } from "../../components";
import styles from "./Subcategories.module.scss";

export const Subcategories = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const isLoading = useSelector(subcategoriesIsLoadingSelector);
	const subcategories = useSelector(subcategoriesSelector);

	const isSubcategoriesPage = !!useMatch(`/categories/:id/subcategories`);

	useEffect(() => {
		dispatch(setSubcategoriesIsLoading(true));

		request(`/api/categories/${params.id}/subcategories`)
			.then(response => {
				dispatch(setSubcategories(response.data));
				dispatch(setSubcategoriesIsLoading(false));
			})
			.catch(e => console.log(e.message))
			.finally(() => dispatch(setSubcategoriesIsLoading(false)));
	}, [dispatch, params.id]);

	const parentTitles = subcategories.map(({ parent }) => parent);

	let parentTitle = parentTitles.reduce((result, item) => {
		return result.includes(item) ? result.join() : [...result, item];
	}, []);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={!isLoading && parentTitle} />
			<div className={styles.cards}>
				{isLoading ? null : subcategories.length > 0 ? (
					<>
						{subcategories.map(({ id, parent, title }) => {
							return (
								<CategoryCard
									key={id}
									id={id}
									parentTitle={parent}
									categoryTitle={title}
									isSubcategoriesPage={isSubcategoriesPage}
								/>
							);
						})}
					</>
				) : (
					<div className={styles.empty}>Подкатегорий нет</div>
				)}
			</div>
		</div>
	);
};
