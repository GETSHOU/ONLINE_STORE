import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync } from "../../store/actions";
import {
	categoriesSelector,
	categoriesErrorSelector,
	categoriesTitleSelector,
	categoriesLoadingStatusSelector,
} from "../../store/selectors";
import { PageTitle, CategoryCard, CategoryCardSkeleton } from "../../components";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const categories = useSelector(categoriesSelector);
	const serverError = useSelector(categoriesErrorSelector);
	const catalogTitle = useSelector(categoriesTitleSelector);
	const loadingStatus = useSelector(categoriesLoadingStatusSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesAsync());
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={catalogTitle} loadingStatus={loadingStatus} />
			<div className={styles.cards}>
				{!loadingStatus ? (
					<>
						{categories.map(({ id, title }) => (
							<CategoryCard key={id} id={id} categoryTitle={title} />
						))}
					</>
				) : (
					<CategoryCardSkeleton inline={true} categories={3} />
				)}
			</div>
			{serverError}
		</div>
	);
};
