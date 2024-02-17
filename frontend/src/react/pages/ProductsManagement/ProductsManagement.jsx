import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	getProductsAsync,
	createProductAsync,
	updateProductAsync,
	deleteProductAsync,
	removeProductFormError,
} from "../../store/actions";
import {
	productsSelector,
	modalDataSelector,
	modalTypeSelector,
	productsTitleSelector,
	productsErrorSelector,
	productsLoadingStatusSelector,
	formErrorCreateProductSelector,
} from "../../store/selectors";
import { productFormSchema } from "../../scheme";
import { MODAL_TYPES, ROLES } from "../../../constants";
import { WithModal } from "../../hoc";
import {
	Form,
	FormGroup,
	ModalEdit,
	ModalConfirm,
	PrivateContent,
	PrivateProvider,
} from "../../components";
import { ProductsList } from "./components/ProductsList/ProductsList";
import { ProductCreatorForm } from "./components/ProductCreatorForm/ProductCreatorForm";

const ModalWindowEdit = WithModal(ModalEdit);
const ModalWindowConfirm = WithModal(ModalConfirm);

export const ProductsManagement = () => {
	const [editButtonIsDisabled, setEditButtonIsDisabled] = useState(false);
	const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(false);
	const [confirmButtonIsDisabled, setConfirmButtonIsDisabled] = useState(false);

	const products = useSelector(productsSelector);
	const formError = useSelector(formErrorCreateProductSelector);
	const serverError = useSelector(productsErrorSelector);
	const loadingStatus = useSelector(productsLoadingStatusSelector);
	const productsTitle = useSelector(productsTitleSelector);

	const params = useParams();
	const dispatch = useDispatch();

	const currentModal = useSelector(modalTypeSelector);
	const { id, field, valueToUpdate, newValueToUpdate } = useSelector(modalDataSelector);

	useEffect(() => {
		dispatch(getProductsAsync(params.id));
	}, [dispatch, params.id]);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			specs: "",
			price: "",
			vendor: "",
			vendorCode: "",
			previewImageUrl: "",
		},
		resolver: yupResolver(productFormSchema),
		mode: "all",
	});

	const titleErrorMessage = errors.title?.message;
	const specsErrorMessage = errors.specs?.message;
	const priceErrorMessage = errors.price?.message;
	const vendorErrorMessage = errors.vendor?.message;
	const vendorCodeErrorMessage = errors.vendorCode?.message;
	const previewImageUrlErrorMessage = errors.previewImageUrl?.message;

	const checkFieldErrors =
		!!formError ||
		!!titleErrorMessage ||
		!!specsErrorMessage ||
		!!priceErrorMessage ||
		!!vendorErrorMessage ||
		!!vendorCodeErrorMessage ||
		!!previewImageUrlErrorMessage;

	const onSubmit = ({ title, previewImageUrl, vendor, vendorCode, specs, price }) => {
		setSubmitButtonIsDisabled(true);

		dispatch(
			createProductAsync(params.id, {
				title,
				previewImageUrl,
				vendor,
				vendorCode,
				specs,
				price,
			}),
		).finally(() => setSubmitButtonIsDisabled(false));

		reset();
	};

	const handleEdit = (id, field, newValueToUpdate) => {
		const trimmedNewValueToUpdate = newValueToUpdate.trim();

		if (trimmedNewValueToUpdate === valueToUpdate) {
			return;
		}

		setEditButtonIsDisabled(true);

		dispatch(updateProductAsync(id, { [field]: trimmedNewValueToUpdate })).finally(() =>
			setEditButtonIsDisabled(false),
		);
	};

	const handleDelete = id => {
		setConfirmButtonIsDisabled(true);

		dispatch(deleteProductAsync(id)).finally(() => setConfirmButtonIsDisabled(false));
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]}>
			<PrivateContent
				subTitle={productsTitle}
				pageTitle={"Управление товарами"}
				serverError={serverError}
				loadingStatus={loadingStatus}
			>
				<ProductCreatorForm>
					<Form onSubmit={handleSubmit(onSubmit)} formError={formError}>
						<FormGroup
							type="text"
							name="title"
							labelname="Название товара"
							fieldError={titleErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("title", {
								onChange: () => {
									if (formError) {
										dispatch(removeProductFormError());
									}
								},
							})}
						/>
						<FormGroup
							type="text"
							name="url"
							labelname="Ссылка на изображение"
							fieldError={previewImageUrlErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("previewImageUrl", {
								onChange: () => {
									if (formError) {
										dispatch(removeProductFormError());
									}
								},
							})}
						/>
						<FormGroup
							type="text"
							name="vendor"
							labelname="Производитель"
							fieldError={vendorErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("vendor", {
								onChange: () => {
									if (formError) {
										dispatch(removeProductFormError());
									}
								},
							})}
						/>
						<FormGroup
							type="text"
							name="vendorCode"
							labelname="Код производителя"
							fieldError={vendorCodeErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("vendorCode", {
								onChange: () => {
									if (formError) {
										dispatch(removeProductFormError());
									}
								},
							})}
						/>
						<FormGroup
							type="text"
							name="specs"
							labelname="Характеристики"
							fieldError={specsErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("specs", {
								onChange: () => {
									if (formError) {
										dispatch(removeProductFormError());
									}
								},
							})}
						/>
						<FormGroup
							type="text"
							name="price"
							labelname="Цена товара"
							fieldError={priceErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("price", {
								onChange: () => {
									if (formError) {
										dispatch(removeProductFormError());
									}
								},
							})}
						/>
						<FormGroup
							buttonText="Создать товар"
							isFormButton={true}
							checkFieldErrors={checkFieldErrors}
							submitButtonIsDisabled={submitButtonIsDisabled}
						/>
					</Form>
				</ProductCreatorForm>
				<ProductsList
					products={products}
					serverError={serverError}
					loadingStatus={loadingStatus}
				/>
			</PrivateContent>

			{/* Рендер модального окна */}
			{currentModal === MODAL_TYPES.CONFIRM ? (
				<ModalWindowConfirm
					message={"Удалить товар?"}
					handleApply={() => handleDelete(id)}
					confirmButtonIsDisabled={confirmButtonIsDisabled}
				/>
			) : (
				currentModal === MODAL_TYPES.FORM_UPDATE && (
					<ModalWindowEdit
						handleEdit={() => handleEdit(id, field, newValueToUpdate)}
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
