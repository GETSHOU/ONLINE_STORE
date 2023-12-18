import { EditCategoryCard } from "../EditCategoryCard/EditCategoryCard";
import styles from "./PrivateCategoriesManagement.module.scss";

export const PrivateCategoriesManagement = ({
	data,
	cardLinkText,
	isCategoriesPage,
	isSubcategoriesPage,
}) => {
	return (
		<div className={styles.cards}>
			{data.map(({ id, title }) => {
				return (
					<EditCategoryCard
						id={id}
						key={id}
						title={title}
						cardLinkText={cardLinkText}
						isCategoriesPage={isCategoriesPage}
						isSubcategoriesPage={isSubcategoriesPage}
					/>
				);
			})}
		</div>
	);
};
