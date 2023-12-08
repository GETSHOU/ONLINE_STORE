import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSubcategories, setSubcategoriesIsLoading } from "../../store/actions";
import {
	subcategoriesSelector,
	subcategoriesIsLoadingSelector,
} from "../../store/selectors";
import { getSectionTitle, request } from "../../../utils";
import { CategoryCard, PageTitle } from "../../components";
import styles from "./Subcategories.module.scss";

export const Subcategories = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const isLoading = useSelector(subcategoriesIsLoadingSelector);
	const subcategories = useSelector(subcategoriesSelector);

	// const [isLoading, setIsLoading] = useState(true);
	// const [subcategories, setSubcategories] = useState([]);

	const isSubcategoriesPage = !!useMatch(`/categories/:id/subcategories`);

	useEffect(() => {
		dispatch(setSubcategoriesIsLoading(true));
		// setIsLoading(true);

		request(`/api/categories/${params.id}/subcategories`)
			.then(response => {
				dispatch(setSubcategories(response.data));
				// setSubcategories(response.data);
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				dispatch(setSubcategoriesIsLoading(false));
				// setIsLoading(false);
			});
	}, [dispatch, params]);

	const sectionTitle = getSectionTitle(subcategories);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={!isLoading && sectionTitle} />
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
				) : null}
			</div>
		</div>
	);
};
