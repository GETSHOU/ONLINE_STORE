import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync } from "../../store/actions";
import {
	categoriesSelector,
	categoriesErrorSelector,
	categoriesTitleSelector,
	categoriesLoadingStatusSelector,
} from "../../store/selectors";
import { PageTitle, CategoryCard } from "../../components";
import { CategoryCardSkeleton } from "../../components/CategoryCard/components/CategoryCardSkeleton/CategoryCardSkeleton";
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
			<PageTitle
				title={catalogTitle}
				serverError={serverError}
				loadingStatus={loadingStatus}
			/>
			{!loadingStatus ? (
				!serverError && (
					<div className={styles.cards}>
						{categories.map(({ id, title }) => (
							<CategoryCard key={id} id={id} categoryTitle={title} />
						))}
					</div>
				)
			) : (
				<div className={styles.cards}>
					<CategoryCardSkeleton inline={true} categories={3} />
				</div>
			)}
		</div>
	);
};
