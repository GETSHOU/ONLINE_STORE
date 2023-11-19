import { useState } from "react";
import {
	AdminContent,
	PrivateContent,
	AddCategoryCard,
	EditableCategoryCard,
} from "../../components";
import { ROLES } from "../../../constants";
import styles from "./SubcategoryManagement.module.scss";

export const SubcategoryManagement = ({ pageTitle }) => {
	const [serverError, setServerError] = useState(null);

	const handleAddSubcategory = () => {
		console.log("Подкатегория добавлена");
	};

	const handleEditSubcategory = () => {
		console.log("Подкатегория изменена");
	};

	const handleRemoveSubcategory = () => {
		console.log("Подкатегория удалена");
	};

	return (
		// <PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
		<AdminContent pageTitle={pageTitle}>
			<AddCategoryCard title="Добавить подкатегорию" handleAdd={handleAddSubcategory} />
			<div className={styles.categoryCards}>
				<EditableCategoryCard
					linkTitle="Материнские платы"
					handleEdit={handleEditSubcategory}
					handleRemove={handleRemoveSubcategory}
				/>
				<EditableCategoryCard
					linkTitle="Видеокарты"
					handleEdit={handleEditSubcategory}
					handleRemove={handleRemoveSubcategory}
				/>
				<EditableCategoryCard
					linkTitle="Процессоры"
					handleEdit={handleEditSubcategory}
					handleRemove={handleRemoveSubcategory}
				/>
			</div>
		</AdminContent>
		// </PrivateContent>
	);
};
