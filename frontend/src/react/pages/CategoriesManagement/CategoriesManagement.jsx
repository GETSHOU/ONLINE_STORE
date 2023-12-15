import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryFormSchema } from "../../scheme";
import { request } from "../../../utils";
import {
	Form,
	FormGroup,
	PrivateContent,
	PrivateProvider,
	PrivateCategoriesManagement,
	CategoryCreatorForm,
} from "../../components";
import { ROLES } from "../../../constants";

export const CategoriesManagement = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [serverError, setServerError] = useState(null);
	const [dataNotExist, setDataNotExist] = useState(false);

	const [showErrorForm, setShowErrorForm] = useState(false);
	const [serverErrorForm, setServerErrorForm] = useState(null);

	const navigate = useNavigate();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
		},
		resolver: yupResolver(categoryFormSchema),
		mode: "all",
	});

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

	const handleEditCategory = () => {
		console.log("Категория изменена");
	};

	const handleRemoveCategory = () => {
		console.log("Категория удалена");
	};

	const onSubmit = ({ title }) => {};

	const titleErrorMessage = errors.title?.message;

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление категориями"}>
				<CategoryCreatorForm>
					<Form
						onSubmit={handleSubmit(onSubmit)}
						buttonText="Создать категорию"
						showErrorForm={showErrorForm}
						serverErrorForm={serverErrorForm}
						titleErrorMessage={titleErrorMessage}
					>
						<FormGroup
							type="text"
							name="title"
							labelname="Название категории"
							placeholder=""
							autoComplete="on"
							error={titleErrorMessage}
							{...register("title", {
								onChange: () => {
									setServerErrorForm(null);
									setShowErrorForm(false);
								},
							})}
						/>
						<FormGroup
							isButton={true}
							buttonText="Создать"
							serverErrorForm={serverErrorForm}
							titleErrorMessage={titleErrorMessage}
						/>
					</Form>
				</CategoryCreatorForm>
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
