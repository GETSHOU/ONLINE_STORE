import { useState } from "react";
import { AdminContent, PrivateContent } from "../../components";
import { ROLES } from "../../../constants";
import styles from "./ProductsManagement.module.scss";

export const ProductsManagement = ({ pageTitle }) => {
	const [serverError, setServerError] = useState(null);

	const handleAddProduct = () => {
		console.log("Категория добавлена");
	};

	const handleEditProduct = () => {
		console.log("Категория изменена");
	};

	const handleRemoveProduct = () => {
		console.log("Категория удалена");
	};

	return (
		// <PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
		<AdminContent pageTitle={pageTitle}></AdminContent>
		// </PrivateContent>
	);
};
