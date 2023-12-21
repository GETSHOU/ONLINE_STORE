import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { openModal } from "../../../../store/actions";
import { MODAL_TYPES } from "../../../../../constants";
import { ActionButton } from "../../../../components";
import { ProductsTableRow } from "../ProductsTableRow/ProductsTableRow";
import styles from "./ProductsTable.module.scss";

export const ProductsTable = ({ product }) => {
	const dispatch = useDispatch();

	const productFields = Object.keys({
		title: product.title,
		specs: product.specs,
		price: product.price,
		vendor: product.vendor,
		vendorCode: product.vendorCode,
		previewImageUrl: product.previewImageUrl,
	});

	const [title, specs, price, vendor, vendorCode, previewImageUrl] = productFields;

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
		<div className={styles.table}>
			<div className={styles.tableHeader}>
				<h2 className={styles.tableTitle}>ID: {product.publicId}</h2>
				<div className={styles.tableActions}>
					<ActionButton
						icon={<FaTrashAlt className="icon iconTrash" />}
						isTableTitle={true}
						clickFunction={() => handleOpenConfirmModal(product.id)}
					/>
				</div>
			</div>
			<div className={styles.tableBody}>
				<ProductsTableRow
					id={product.id}
					title="Название товара"
					value={product.title}
					productField={title}
				/>
				<ProductsTableRow
					id={product.id}
					title="Ссылка на изображение"
					value={product.previewImageUrl}
					productField={previewImageUrl}
				/>
				<ProductsTableRow
					id={product.id}
					title="Производитель"
					value={product.vendor}
					productField={vendor}
				/>
				<ProductsTableRow
					id={product.id}
					title="Код производителя"
					value={product.vendorCode}
					productField={vendorCode}
				/>
				<ProductsTableRow
					id={product.id}
					title="Характеристики"
					value={product.specs}
					productField={specs}
				/>
				<ProductsTableRow
					id={product.id}
					title="Цена товара"
					value={product.price}
					productField={price}
				/>
			</div>
		</div>
	);
};
