import { useEffect } from "react";
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
		mode: "onSubmit",
	});

	const titleErrorMessage = errors.title?.message;

	const checkFieldErrors = !!formError || !!titleErrorMessage;

	const onSubmit = ({ title }) => {
		dispatch(createCategoryAsync(title));
		reset();
	};

	const handleEdit = (id, newValueToUpdate) => {
		const trimmedNewValueToUpdate = newValueToUpdate.trim();

		if (trimmedNewValueToUpdate === valueToUpdate) {
			return;
		}

		dispatch(updateCategoryAsync(id, trimmedNewValueToUpdate));
	};

	const handleDelete = id => dispatch(deleteCategoryAsync(id));

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
							error={titleErrorMessage}
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
				/>
			) : (
				currentModal === MODAL_TYPES.FORM_UPDATE && (
					<ModalWindowEdit
						handleEdit={() => handleEdit(id, newValueToUpdate)}
						modalTitle="Редактирование"
						valueToUpdate={valueToUpdate}
						newValueToUpdate={newValueToUpdate}
					/>
				)
			)}
		</PrivateProvider>
	);
};
