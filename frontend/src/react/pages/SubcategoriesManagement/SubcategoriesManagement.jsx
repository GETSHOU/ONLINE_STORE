import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { TbLayoutGridAdd } from "react-icons/tb";
import { request } from "../../../utils";
import { ROLES } from "../../../constants";
import {
	CreateButton,
	PrivateContent,
	PrivateProvider,
	PrivateCategoriesManagement,
} from "../../components";

export const SubcategoriesManagement = () => {
	const [subcategories, setSubcategories] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const params = useParams();
	const navigate = useNavigate();

	const isSubcategoriesPage = !!useMatch(`/categories-m/:id/subcategories-m`);

	useEffect(() => {
		setIsLoading(true);

		request(`/api/categories/${params.id}/subcategories`)
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						navigate("/subcategories-m-not-exist", { replace: true });

						return;
					}

					if (response.error) {
						setServerError(response.error);

						return;
					}

					setDataNotExist(false);
					setSubcategories(response.data);
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate, params.id]);

	const handleCreateSubcategory = () => {
		console.log("Подкатегория добавлена");
	};

	const handleEditSubcategory = () => {
		console.log("Подкатегория изменена");
	};

	const handleRemoveSubcategory = () => {
		console.log("Подкатегория удалена");
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление подкатегориями"}>
				<CreateButton
					icon={<TbLayoutGridAdd className="icon iconCreateCategory" />}
					handleCreate={handleCreateSubcategory}
				/>
				{!isLoading
					? !dataNotExist && (
							<>
								<PrivateCategoriesManagement
									data={subcategories}
									handleEdit={handleEditSubcategory}
									handleRemove={handleRemoveSubcategory}
									cardLinkText={"Перейти к товарам"}
									isSubcategoriesPage={isSubcategoriesPage}
								/>
							</>
					  )
					: null}
			</PrivateContent>
		</PrivateProvider>
	);
};
