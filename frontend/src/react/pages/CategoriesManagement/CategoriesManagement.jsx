import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	getCategoriesAsync,
	createCategoryAsync,
	updateCategoryAsync,
	deleteCategoryAsync,
	removeCategoriesFormError,
} from "../../store/actions";
import {
	modalDataSelector,
	modalTypeSelector,
	categoriesSelector,
	categoriesTitleSelector,
	categoriesErrorSelector,
	categoriesLoadingStatusSelector,
	formErrorCreateCategorySelector,
} from "../../store/selectors";
import { categoryFormSchema } from "../../scheme";
import { MODAL_TYPES, ROLES } from "../../../constants";
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
import { WithModal } from "../../hoc";

const ModalWindowEdit = WithModal(ModalEdit);
const ModalWindowConfirm = WithModal(ModalConfirm);

export const CategoriesManagement = () => {
	const [editButtonIsDisabled, setEditButtonIsDisabled] = useState(false);
	const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(false);
	const [confirmButtonIsDisabled, setConfirmButtonIsDisabled] = useState(false);

	const formError = useSelector(formErrorCreateCategorySelector);
	const categories = useSelector(categoriesSelector);
	const serverError = useSelector(categoriesErrorSelector);
	const catalogTitle = useSelector(categoriesTitleSelector);
	const currentModal = useSelector(modalTypeSelector);
	const loadingStatus = useSelector(categoriesLoadingStatusSelector);
	const { id, valueToUpdate, newValueToUpdate } = useSelector(modalDataSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesAsync());
	}, [dispatch]);

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

	const checkFieldErrors = !!formError || !!titleErrorMessage;

	const onSubmit = ({ title }) => {
		setSubmitButtonIsDisabled(true);

		dispatch(createCategoryAsync(title)).finally(() => setSubmitButtonIsDisabled(false));

		reset();
	};

	const handleEdit = (id, newValueToUpdate) => {
		const trimmedNewValueToUpdate = newValueToUpdate.trim();

		if (trimmedNewValueToUpdate === valueToUpdate) {
			return;
		}

		setEditButtonIsDisabled(true);

		dispatch(updateCategoryAsync(id, trimmedNewValueToUpdate)).finally(() =>
			setEditButtonIsDisabled(false),
		);
	};

	const handleDelete = id => {
		setConfirmButtonIsDisabled(true);

		dispatch(deleteCategoryAsync(id)).finally(() => setConfirmButtonIsDisabled(false));
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]}>
			<PrivateContent
				subTitle={catalogTitle}
				pageTitle={"Управление категориями"}
				serverError={serverError}
				loadingStatus={loadingStatus}
			>
				<CategoryCreatorForm>
					<Form onSubmit={handleSubmit(onSubmit)} formError={formError}>
						<FormGroup
							type="text"
							name="title"
							labelname="Название категории"
							placeholder=""
							autoComplete="on"
							fieldError={titleErrorMessage}
							{...register("title", {
								onChange: () => {
									if (formError) {
										dispatch(removeCategoriesFormError());
									}
								},
							})}
						/>
						<FormGroup
							buttonText="Создать категорию"
							isFormButton={true}
							checkFieldErrors={checkFieldErrors}
							submitButtonIsDisabled={submitButtonIsDisabled}
						/>
					</Form>
				</CategoryCreatorForm>
				<PrivateCategoriesManagement
					data={categories}
					serverError={serverError}
					cardLinkText={"Перейти к подкатегориям"}
					loadingStatus={loadingStatus}
				/>
			</PrivateContent>

			{/* Рендер модального окна */}
			{currentModal === MODAL_TYPES.CONFIRM ? (
				<ModalWindowConfirm
					message={"Удалить подкатегорию?"}
					handleApply={() => handleDelete(id)}
					confirmButtonIsDisabled={confirmButtonIsDisabled}
				/>
			) : (
				currentModal === MODAL_TYPES.FORM_UPDATE && (
					<ModalWindowEdit
						handleEdit={() => handleEdit(id, newValueToUpdate)}
						modalTitle="Редактирование"
						valueToUpdate={valueToUpdate}
						newValueToUpdate={newValueToUpdate}
						editButtonIsDisabled={editButtonIsDisabled}
					/>
				)
			)}
		</PrivateProvider>
	);
};
