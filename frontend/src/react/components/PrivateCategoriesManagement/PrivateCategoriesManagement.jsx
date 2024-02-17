import { CategoryCardSkeleton } from "../CategoryCard/components/CategoryCardSkeleton/CategoryCardSkeleton";
import { EditCategoryCard } from "../EditCategoryCard/EditCategoryCard";
import styles from "./PrivateCategoriesManagement.module.scss";

export const PrivateCategoriesManagement = ({
	data,
	serverError,
	cardLinkText,
	loadingStatus,
	isSubcategoriesPage,
}) => {
	return (
		<div className={styles.cards}>
			{!loadingStatus ? (
				!serverError &&
				data.map(({ id, title }) => {
					return (
						<EditCategoryCard
							id={id}
							key={id}
							title={title}
							cardLinkText={cardLinkText}
							isSubcategoriesPage={isSubcategoriesPage}
						/>
					);
				})
			) : (
				<CategoryCardSkeleton
					initial={true}
					baseColor="#B8B8B8"
					categories={3}
					highlightColor="#CDCDCD"
				/>
			)}
		</div>
	);
};
