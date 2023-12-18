import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	closeModal,
	createCategory,
	updateCategory,
	updateModalInputValue,
} from "../../store/actions";
import { modalDataSelector, modalTypeSelector } from "../../store/selectors";
import { categoryFormSchema } from "../../scheme";
import { request } from "../../../utils";
import {
	Form,
	FormGroup,
	ModalConfirm,
	PrivateContent,
	PrivateProvider,
	ModalEditCategory,
	CategoryCreatorForm,
	PrivateCategoriesManagement,
} from "../../components";
import { MODAL_TYPES, ROLES } from "../../../constants";
import { WithModal } from "../../hoc";

const ModalWindowConfirm = WithModal(ModalConfirm);
const ModalWindowEditCategory = WithModal(ModalEditCategory);

export const CategoriesManagement = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);
	const [serverError, setServerError] = useState(null);
	const [dataNotExist, setDataNotExist] = useState(false);
	const [showErrorForm, setShowErrorForm] = useState(false);
	const [serverErrorForm, setServerErrorForm] = useState(null);
	const [shouldUpdateCategories, setShouldUpdateCategories] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCategoriesPage = !!useMatch(`/categories-m`);

	const currentModal = useSelector(modalTypeSelector);
	const { id, title, newTitle } = useSelector(modalDataSelector);

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
		mode: "onSubmit",
	});

	const titleErrorMessage = errors.title?.message;

	useEffect(() => {
		// setIsLoading(true);

		request("/api/categories")
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						// navigate("/categories-m-not-exist", { replace: true });

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
				// setIsLoading(false);
			});
	}, [navigate, shouldUpdateCategories]);

	useEffect(() => {
		if (newTitle === title) {
			setIsDisabled(true);
		}
	}, [newTitle, title]);

	const onSubmit = ({ title }) => {
		setShouldUpdateCategories(true);

		request("/api/categories/create", "POST", { title })
			.then(response => {
				if (response.error) {
					setServerErrorForm(`Ошибка запроса: ${response.error}`);
					setShowErrorForm(true);

					return;
				}

				dispatch(createCategory(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateCategories(false);

				reset();
			});
	};

	const handleDelete = id => {
		setShouldUpdateCategories(true);

		request(`/api/categories/${id}/delete`, "DELETE")
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateCategories(false);
			});

		dispatch(closeModal());
	};

	const onChangeValueTitle = ({ target }) => {
		dispatch(updateModalInputValue(target.value));

		if (target.value.trim().length !== 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}

		if (target.value.trim() === title) {
			setIsDisabled(true);
		}
	};

	const handleEdit = (id, newTitle) => {
		const trimmedNewTitle = newTitle.trim();

		if (trimmedNewTitle === title) {
			return;
		}

		setShouldUpdateCategories(true);

		request(isCategoriesPage && `/api/categories/${id}/update`, "PATCH", {
			title: trimmedNewTitle,
		})
			.then(response => {
				dispatch(updateCategory(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateCategories(false);
			});

		dispatch(closeModal());
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление категориями"}>
				<CategoryCreatorForm>
					<Form
						onSubmit={handleSubmit(onSubmit)}
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
							buttonText="Создать категорию"
							serverErrorForm={serverErrorForm}
							titleErrorMessage={titleErrorMessage}
						/>
					</Form>
				</CategoryCreatorForm>
				{!dataNotExist && (
					<>
						<PrivateCategoriesManagement
							data={categories}
							cardLinkText={"Перейти к подкатегориям"}
							isCategoriesPage={isCategoriesPage}
						/>
					</>
				)}

				{/* Рендер модального окна */}
				{currentModal === MODAL_TYPES.CONFIRM ? (
					<ModalWindowConfirm handleApply={() => handleDelete(id)} />
				) : (
					currentModal === MODAL_TYPES.EDIT_CATEGORY && (
						<ModalWindowEditCategory
							newTitle={newTitle}
							onChange={onChangeValueTitle}
							handleEdit={() => handleEdit(id, newTitle)}
							isDisabled={isDisabled}
							modalTitle="Редактирование"
						/>
					)
				)}
			</PrivateContent>
		</PrivateProvider>
	);
};
