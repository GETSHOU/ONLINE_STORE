import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	closeModal,
	getSubcategoriesAsync,
	createSubcategoryAsync,
	updateSubcategoryAsync,
	deleteSubcategoryAsync,
	removeSubcategoriesFormError,
} from "../../store/actions";
import {
	modalDataSelector,
	modalTypeSelector,
	subcategoriesSelector,
	subcategoriesTitleSelector,
	subcategoriesErrorSelector,
	subcategoriesLoadingStatusSelector,
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

export const SubcategoriesManagement = () => {
	const serverError = useSelector(subcategoriesErrorSelector);
	const currentModal = useSelector(modalTypeSelector);
	const loadingStatus = useSelector(subcategoriesLoadingStatusSelector);
	const subcategories = useSelector(subcategoriesSelector);
	const subcategoriesTitle = useSelector(subcategoriesTitleSelector);
	const { id, valueToUpdate, newValueToUpdate } = useSelector(modalDataSelector);

	const params = useParams();
	const dispatch = useDispatch();
	const isSubcategoriesPage = !!useMatch(`/categories-m/:id/subcategories-m`);

	useEffect(() => {
		dispatch(getSubcategoriesAsync(params.id));
	}, [dispatch, params.id]);

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

	const checkFieldErrors = !!serverError || !!titleErrorMessage;

	const onSubmit = ({ title }) => {
		dispatch(createSubcategoryAsync(params.id, title)).finally(() => {
			reset();
		});
	};

	const handleEdit = (id, newValueToUpdate) => {
		const trimmedNewValueToUpdate = newValueToUpdate.trim();

		if (trimmedNewValueToUpdate === valueToUpdate) {
			return;
		}

		dispatch(updateSubcategoryAsync(id, trimmedNewValueToUpdate)).finally(() =>
			dispatch(closeModal()),
		);
	};

	const handleDelete = id =>
		dispatch(deleteSubcategoryAsync(id)).finally(() => dispatch(closeModal()));

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]}>
			<PrivateContent
				subTitle={subcategoriesTitle}
				pageTitle={"Управление подкатегориями"}
				serverError={serverError}
				loadingStatus={loadingStatus}
			>
				<CategoryCreatorForm>
					<Form onSubmit={handleSubmit(onSubmit)} serverError={serverError}>
						<FormGroup
							type="text"
							name="title"
							labelname="Название подкатегории"
							placeholder=""
							autoComplete="on"
							error={titleErrorMessage}
							{...register("title", {
								onChange: () => {
									if (serverError) {
										dispatch(removeSubcategoriesFormError());
									}
								},
							})}
						/>
						<FormGroup
							buttonText="Создать подкатегорию"
							isFormButton={true}
							checkFieldErrors={checkFieldErrors}
						/>
					</Form>
				</CategoryCreatorForm>
				<PrivateCategoriesManagement
					data={subcategories}
					serverError={serverError}
					cardLinkText={"Перейти к товарам"}
					loadingStatus={loadingStatus}
					isSubcategoriesPage={isSubcategoriesPage}
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
