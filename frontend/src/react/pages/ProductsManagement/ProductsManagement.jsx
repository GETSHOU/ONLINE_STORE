import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	closeModal,
	createProduct,
	updateProduct,
	deleteProduct,
	updateModalInputValue,
} from "../../store/actions";
import { modalDataSelector, modalTypeSelector } from "../../store/selectors";
import { productFormSchema } from "../../scheme";
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
} from "../../components";
import { ProductsList } from "./components/ProductsList/ProductsList";
import { ProductCreatorForm } from "./components/ProductCreatorForm/ProductCreatorForm";

const ModalWindowEdit = WithModal(ModalEdit);
const ModalWindowConfirm = WithModal(ModalConfirm);

export const ProductsManagement = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [serverError, setServerError] = useState(null);
	const [dataNotExist, setDataNotExist] = useState(false);
	const [showErrorForm, setShowErrorForm] = useState(false);
	const [serverErrorForm, setServerErrorForm] = useState(null);
	const [shouldUpdateProducts, setShouldUpdateProducts] = useState(false);

	const params = useParams();
	const dispatch = useDispatch();

	const currentModal = useSelector(modalTypeSelector);
	const { id, field, valueToUpdate, newValueToUpdate } = useSelector(modalDataSelector);

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
		!!serverErrorForm ||
		!!titleErrorMessage ||
		!!specsErrorMessage ||
		!!priceErrorMessage ||
		!!vendorErrorMessage ||
		!!vendorCodeErrorMessage ||
		!!previewImageUrlErrorMessage;

	useEffect(() => {
		// setIsLoading(true);

		request(`/api/subcategories/${params.id}/products`)
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);

						return;
					}

					if (response.error) {
						setServerError(response.error);

						return;
					}

					setDataNotExist(false);
					setProducts(response.data);
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				// setIsLoading(false);
			});
	}, [params.id, shouldUpdateProducts]);

	const onSubmit = ({ title, previewImageUrl, vendor, vendorCode, specs, price }) => {
		setShouldUpdateProducts(true);

		request(`/api/subcategories/${params.id}/products/create`, "POST", {
			title,
			specs,
			price,
			vendor,
			vendorCode,
			previewImageUrl,
		})
			.then(response => {
				if (response.error) {
					setServerErrorForm(`Ошибка запроса: ${response.error}`);
					setShowErrorForm(true);

					return;
				}

				dispatch(createProduct(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateProducts(false);
				reset();
			});
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

	const handleDelete = id => {
		setShouldUpdateProducts(true);

		request(`/api/products/${id}/delete`, "DELETE")
			.catch(e => console.log(e.message))
			.finally(() => {
				dispatch(deleteProduct(id));
				setShouldUpdateProducts(false);
			});

		dispatch(closeModal());
	};

	const handleEdit = (id, field, newValueToUpdate) => {
		const trimmedNewValueToUpdate = newValueToUpdate.trim();

		if (trimmedNewValueToUpdate === valueToUpdate) {
			return;
		}

		setShouldUpdateProducts(true);

		request(`/api/products/${id}/update`, "PATCH", { [field]: trimmedNewValueToUpdate })
			.then(response => {
				dispatch(updateProduct(response.data));
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setShouldUpdateProducts(false);
				setIsDisabled(true);
			});

		dispatch(closeModal());
	};

	return (
		<PrivateProvider access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError={serverError}>
			<PrivateContent pageTitle={"Управление товарами"}>
				<ProductCreatorForm>
					<Form
						onSubmit={handleSubmit(onSubmit)}
						showErrorForm={showErrorForm}
						serverErrorForm={serverErrorForm}
					>
						<FormGroup
							type="text"
							name="title"
							labelname="Название товара"
							fieldError={titleErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("title")}
						/>
						<FormGroup
							type="text"
							name="url"
							labelname="Ссылка на изображение"
							fieldError={previewImageUrlErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("previewImageUrl")}
						/>
						<FormGroup
							type="text"
							name="vendor"
							labelname="Производитель"
							fieldError={vendorErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("vendor")}
						/>
						<FormGroup
							type="text"
							name="vendorCode"
							labelname="Код производителя"
							fieldError={vendorCodeErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("vendorCode")}
						/>
						<FormGroup
							type="text"
							name="specs"
							labelname="Характеристики"
							fieldError={specsErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("specs")}
						/>
						<FormGroup
							type="text"
							name="price"
							labelname="Цена товара"
							fieldError={priceErrorMessage}
							placeholder=""
							autoComplete="on"
							{...register("price")}
						/>
						<FormGroup
							buttonText="Создать товар"
							isFormButton={true}
							checkFieldErrors={checkFieldErrors}
						/>
					</Form>
				</ProductCreatorForm>

				{!dataNotExist && (
					<>
						<ProductsList products={products} />
					</>
				)}

				{/* Рендер модального окна */}
				{currentModal === MODAL_TYPES.CONFIRM ? (
					<ModalWindowConfirm
						message="Удалить товар?"
						handleApply={() => handleDelete(id)}
					/>
				) : (
					currentModal === MODAL_TYPES.FORM_UPDATE && (
						<ModalWindowEdit
							onChange={onChangeValue}
							handleEdit={() => handleEdit(id, field, newValueToUpdate)}
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
