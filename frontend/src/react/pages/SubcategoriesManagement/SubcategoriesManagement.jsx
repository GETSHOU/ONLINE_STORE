import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	closeModal,
	updateCategory,
	createSubcategory,
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

export const SubcategoriesManagement = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [serverError, setServerError] = useState(null);
	const [dataNotExist, setDataNotExist] = useState(false);
	const [showErrorForm, setShowErrorForm] = useState(false);
	const [subcategories, setSubcategories] = useState([]);
	const [serverErrorForm, setServerErrorForm] = useState(null);
	const [shouldUpdateSubategories, setShouldUpdateSubcategories] = useState(false);

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSubcategoriesPage = !!useMatch(`/categories-m/:id/subcategories-m`);

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
		mode: "all",
	});

	const titleErrorMessage = errors.title?.message;

	useEffect(() => {
		// setIsLoading(true);

		request(`/api/categories/${params.id}/subcategories`)
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						// navigate("/subcategories-m-not-exist", { replace: true });

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
				// setIsLoading(false);
			});
	}, [navigate, params.id, shouldUpdateSubategories]);

	useEffect(() => {
		if (newTitle === title) {
			setIsDisabled(true);
		}
	}, [newTitle, title]);

	const onSubmit = ({ title }) => {
		setShouldUpdateSubcategories(true);

		request(`/api/categories/${params.id}/subcategories/create`, "POST", { title })
			.then(response => {
				if (response.error) {
					setServerErrorForm(`Ошибка запроса: ${response.error}`);
					setShowErrorForm(true);

					return;
				}

				dispatch(createSubcategory(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateSubcategories(false);
				reset();
			});
	};

	const handleDelete = id => {
		setShouldUpdateSubcategories(true);

		request(`/api/subcategories/${id}/delete`, "DELETE")
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateSubcategories(false);
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

		setShouldUpdateSubcategories(true);

		request(isSubcategoriesPage && `/api/subcategories/${id}/update`, "PATCH", {
			title: trimmedNewTitle,
		})
			.then(response => {
				dispatch(updateCategory(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateSubcategories(false);
			});

		dispatch(closeModal());
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление подкатегориями"}>
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
							labelname="Название подкатегории"
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
							buttonText="Создать подкатегорию"
							serverErrorForm={serverErrorForm}
							titleErrorMessage={titleErrorMessage}
						/>
					</Form>
				</CategoryCreatorForm>
				{!dataNotExist && (
					<>
						<PrivateCategoriesManagement
							data={subcategories}
							cardLinkText={"Перейти к товарам"}
							isSubcategoriesPage={isSubcategoriesPage}
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
