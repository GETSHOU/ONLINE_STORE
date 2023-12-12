import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbLayoutGridAdd } from "react-icons/tb";
import { request } from "../../../utils";
import {
	CreateButton,
	PrivateContent,
	PrivateProvider,
	PrivateCategoriesManagement,
} from "../../components";

import { ROLES } from "../../../constants";

export const CategoriesManagement = () => {
	const [categories, setCategories] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);

		request("/api/categories")
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						navigate("/categories-m-not-exist", { replace: true });

						return;
					}

					if (response.error) {
						setServerError(response.error);

						return;
					}

					setDataNotExist(false);
					setCategories(response.data);
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate]);

	const handleCreateCategory = () => {
		console.log("Категория добавлена");
	};

	const handleEditCategory = () => {
		console.log("Категория изменена");
	};

	const handleRemoveCategory = () => {
		console.log("Категория удалена");
	};

	// TODO: Добавить компонент Loader там, где ждем ответ с сервера

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление категориями"}>
				<CreateButton
					icon={<TbLayoutGridAdd className="icon iconCreateCategory" />}
					handleCreate={handleCreateCategory}
				/>
				{!isLoading
					? !dataNotExist && (
							<>
								<PrivateCategoriesManagement
									data={categories}
									handleEdit={handleEditCategory}
									handleRemove={handleRemoveCategory}
									cardLinkText={"Перейти к подкатегориям"}
								/>
							</>
					  )
					: null}
			</PrivateContent>
		</PrivateProvider>
	);
};
