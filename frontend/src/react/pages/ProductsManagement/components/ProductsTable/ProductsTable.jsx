import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { openModal } from "../../../../store/actions";
import { MODAL_TYPES } from "../../../../../constants";
import { ActionButton } from "../../../../components";
import { ProductsTableRow } from "../ProductsTableRow/ProductsTableRow";
import styles from "./ProductsTable.module.scss";

export const ProductsTable = ({
	id,
	title,
	specs,
	price,
	vendor,
	publicId,
	vendorCode,
	previewImageUrl,
}) => {
	const dispatch = useDispatch();

	const productFields = Object.keys({
		title,
		specs,
		price,
		vendor,
		vendorCode,
		previewImageUrl,
	});

	const [
		fieldTitle,
		fieldSpecs,
		fieldPrice,
		fieldVendor,
		fieldVendorCode,
		fieldPreviewImageUrl,
	] = productFields;

	const handleOpenConfirmModal = id => {
		dispatch(
			openModal({
				type: MODAL_TYPES.CONFIRM,
				data: {
					id,
				},
			}),
		);
	};

	return (
		<>
			<div className={styles.table}>
				<div className={styles.table__header}>
					<h2 className={styles.table__title}>ID: {publicId}</h2>
					<div className={styles.table__actions}>
						<ActionButton
							icon={<FaTrashAlt className="icon iconTrash" />}
							isTableTitle={true}
							clickFunction={() => handleOpenConfirmModal(id)}
						/>
					</div>
				</div>
				<div className={styles.table__body}>
					<ProductsTableRow
						title="Название товара"
						value={title}
						productId={id}
						productField={fieldTitle}
					/>
					<ProductsTableRow
						title="Ссылка на изображение"
						value={previewImageUrl}
						productId={id}
						productField={fieldPreviewImageUrl}
					/>
					<ProductsTableRow
						title="Производитель"
						value={vendor}
						productId={id}
						productField={fieldVendor}
					/>
					<ProductsTableRow
						title="Код производителя"
						value={vendorCode}
						productId={id}
						productField={fieldVendorCode}
					/>
					<ProductsTableRow
						title="Характеристики"
						value={specs}
						productId={id}
						productField={fieldSpecs}
					/>
					<ProductsTableRow
						title="Цена товара"
						value={price}
						productId={id}
						productField={fieldPrice}
					/>
				</div>
			</div>
		</>
	);
};
