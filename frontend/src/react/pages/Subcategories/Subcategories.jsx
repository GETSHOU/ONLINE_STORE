import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategoriesAsync } from "../../store/actions";
import {
	subcategoriesSelector,
	subcategoriesErrorSelector,
	subcategoriesTitleSelector,
	subcategoriesLoadingStatusSelector,
} from "../../store/selectors";
import { PageTitle, CategoryCard, CategoryCardSkeleton } from "../../components";
import styles from "./Subcategories.module.scss";

export const Subcategories = () => {
	const serverError = useSelector(subcategoriesErrorSelector);
	const loadingStatus = useSelector(subcategoriesLoadingStatusSelector);
	const subcategories = useSelector(subcategoriesSelector);
	const subcategoriesTitle = useSelector(subcategoriesTitleSelector);

	const params = useParams();
	const dispatch = useDispatch();

	const isSubcategoriesPage = !!useMatch(`/categories/:id`);

	useEffect(() => {
		dispatch(getSubcategoriesAsync(params.id));
	}, [dispatch, params.id]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={subcategoriesTitle} loadingStatus={loadingStatus} />
			<div className={styles.cards}>
				{!loadingStatus ? (
					<>
						{subcategories.map(({ id, parent, title }) => (
							<CategoryCard
								key={id}
								id={id}
								parentTitle={parent}
								categoryTitle={title}
								isSubcategoriesPage={isSubcategoriesPage}
							/>
						))}
					</>
				) : (
					<CategoryCardSkeleton inline={true} categories={3} />
				)}
			</div>
		</div>
	);
};
