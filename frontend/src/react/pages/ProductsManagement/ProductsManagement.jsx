import { useState } from "react";
import { ROLES } from "../../../constants";
import { PrivateProvider, PrivateContent } from "../../components";

export const ProductsManagement = () => {
	const [serverError, setServerError] = useState(null);

	const handleCreateProduct = () => {
		console.log("Товар добавлен");
	};

	const handleEditProduct = () => {
		console.log("Товар изменен");
	};

	const handleRemoveProduct = () => {
		console.log("Товар удален");
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление товарами"}></PrivateContent>
		</PrivateProvider>
	);
};
