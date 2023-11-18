import { useState } from "react";
import { AdminContent, PrivateContent } from "../../components";
import { AddCategory } from "./components/AddCategory/AddCategory";
import { CategoryCard } from "./components/CategoryCard/CategoryCard";
import { ROLES } from "../../../constants";
import styles from "./CatalogManagement.module.scss";

export const CatalogManagement = () => {
	const [serverError, setServerError] = useState(null);

	const handleAddCategory = () => {
		console.log("Категория добавлена");
	};

	const handleEditCategory = () => {
		console.log("Категория изменена");
	};

	const handleRemoveCategory = () => {
		console.log("Категория удалена");
	};

	return (
		// <PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
		<AdminContent pageTitle="Управление каталогом">
			<AddCategory title="Добавить категорию" action={handleAddCategory} />
			<div className={styles.categoryCards}>
				<CategoryCard
					linkTitle="Комплектующие для ПК"
					handleEditCategory={handleEditCategory}
					handleRemoveCategory={handleRemoveCategory}
				/>
				<CategoryCard
					linkTitle="Периферия"
					handleEditCategory={handleEditCategory}
					handleRemoveCategory={handleRemoveCategory}
				/>
				<CategoryCard
					linkTitle="Серверное оборудование"
					handleEditCategory={handleEditCategory}
					handleRemoveCategory={handleRemoveCategory}
				/>
			</div>
		</AdminContent>
		// </PrivateContent>
	);
};
