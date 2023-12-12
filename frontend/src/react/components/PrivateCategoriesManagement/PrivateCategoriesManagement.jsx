import { EditCategoryCard } from "../EditCategoryCard/EditCategoryCard";
import styles from "./PrivateCategoriesManagement.module.scss";

export const PrivateCategoriesManagement = ({
	data,
	handleEdit,
	cardLinkText,
	handleRemove,
	isSubcategoriesPage,
}) => {
	return (
		<div className={styles.cards}>
			{data.map(({ id, title }) => (
				<EditCategoryCard
					id={id}
					key={id}
					handleEdit={handleEdit}
					handleRemove={handleRemove}
					cardLinkText={cardLinkText}
					categoryTitle={title}
					isSubcategoriesPage={isSubcategoriesPage}
				/>
			))}
		</div>
	);
};
