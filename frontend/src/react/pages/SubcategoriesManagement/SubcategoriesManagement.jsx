import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	closeModal,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
	updateModalInputValue,
} from "../../store/actions";
import { modalDataSelector, modalTypeSelector } from "../../store/selectors";
import { categoryFormSchema } from "../../scheme";
import { request } from "../../../utils";
import { MODAL_TYPES, ROLES } from "../../../constants";
import { WithModal } from "../../hoc";
import {
	Form,
	FormGroup,
	ModalEdit,
	ModalConfirm,
	PrivateContent,
	PrivateProvider,
	CategoryCreatorForm,
	PrivateCategoriesManagement,
} from "../../components";

const ModalWindowEdit = WithModal(ModalEdit);
const ModalWindowConfirm = WithModal(ModalConfirm);

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
	const { id, valueToUpdate, newValueToUpdate } = useSelector(modalDataSelector);

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
		if (newValueToUpdate === valueToUpdate) {
			setIsDisabled(true);
		}
	}, [newValueToUpdate, valueToUpdate]);

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
				dispatch(deleteSubcategory(id));
				setShouldUpdateSubcategories(false);
			});

		dispatch(closeModal());
	};

	const onChangeValue = ({ target }) => {
		dispatch(updateModalInputValue(target.value));

		if (target.value.trim().length !== 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}

		if (target.value.trim() === valueToUpdate) {
			setIsDisabled(true);
		}
	};

	const handleEdit = (id, newValueToUpdate) => {
		const trimmedNewValueToUpdate = newValueToUpdate.trim();

		if (trimmedNewValueToUpdate === valueToUpdate) {
			return;
		}

		setShouldUpdateSubcategories(true);

		request(isSubcategoriesPage && `/api/subcategories/${id}/update`, "PATCH", {
			title: trimmedNewValueToUpdate,
		})
			.then(response => {
				dispatch(updateSubcategory(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateSubcategories(false);
				setIsDisabled(true);
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
							buttonText="Создать подкатегорию"
							isFormButton={true}
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
					<ModalWindowConfirm
						message="Удалить подкатегорию?"
						handleApply={() => handleDelete(id)}
					/>
				) : (
					currentModal === MODAL_TYPES.FORM_UPDATE && (
						<ModalWindowEdit
							onChange={onChangeValue}
							handleEdit={() => handleEdit(id, newValueToUpdate)}
							isDisabled={isDisabled}
							modalTitle="Редактирование"
							newValueToUpdate={newValueToUpdate}
						/>
					)
				)}
			</PrivateContent>
		</PrivateProvider>
	);
};
