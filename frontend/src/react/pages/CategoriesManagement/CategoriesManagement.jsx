import { useState } from "react";
import {
	AdminContent,
	PrivateContent,
	AddCategoryCard,
	EditableCategoryCard,
} from "../../components";
import { ROLES } from "../../../constants";
import styles from "./CategoriesManagement.module.scss";

export const CategoriesManagement = () => {
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
		<PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
			<AdminContent pageTitle="Управление категориями">
				<AddCategoryCard title="Добавить категорию" handleAdd={handleAddCategory} />
				<div className={styles.categoryCards}>
					<EditableCategoryCard
						linkTitle="Комплектующие для ПК"
						handleEdit={handleEditCategory}
						handleRemove={handleRemoveCategory}
					/>
					<EditableCategoryCard
						linkTitle="Периферия"
						handleEdit={handleEditCategory}
						handleRemove={handleRemoveCategory}
					/>
					<EditableCategoryCard
						linkTitle="Серверное оборудование"
						handleEdit={handleEditCategory}
						handleRemove={handleRemoveCategory}
					/>
				</div>
			</AdminContent>
		</PrivateContent>
	);
};
